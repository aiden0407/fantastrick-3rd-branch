// BroadcastChannel 생성 (채널명: 'arduino_channel')
const channel = new BroadcastChannel('arduino_channel');
let lastSlaveMessageTime = Date.now();
const RECONNECT_TIMEOUT = 5000; // 5초 이상 업데이트가 없으면 연결 끊김으로 간주

// front.html에서 전송한 제어 명령에 대해 재전송 로직을 위한 pending 명령 저장소
const pendingCommands = {}; // key: "arduinoID_pin", value: { command, intervalId }

// slave로부터 받은 최신 전체 아두이노 정보 저장 (UI 갱신용)
let slaveData = {};

// 아두이노 카드 UI 생성 함수 (slaveData 기반)
function createArduinoCard(arduino) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-arduino-id', arduino.arduinoID);

  const header = document.createElement('div');
  header.className = 'arduino-header';
  header.innerHTML = `<h3>${arduino.arduinoID}</h3>`;
  card.appendChild(header);

  const pinsContainer = document.createElement('div');
  pinsContainer.className = 'pins';

  arduino.pins.forEach(pin => {
    const pinDiv = document.createElement('div');
    pinDiv.className = 'pin';
    // id 예: card-arduino-100-pin-4
    pinDiv.id = `card-${arduino.arduinoID}-pin-${pin.pin}`;

    const pinText = document.createElement('span');
    pinText.className = 'pin-text';
    pinText.innerText = `Pin ${pin.pin} - ${pin.nickname} (${pin.mode})`;

    const switchLabel = document.createElement('label');
    switchLabel.className = 'switch';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = (pin.state === 'on');
    // write 핀은 제어 가능하므로 disabled 속성을 제거
    checkbox.disabled = (pin.mode !== 'write');

    // read 핀인 경우 전역 변수에 자동으로 상태 저장
    // 전역 변수명: arduino.arduinoID + "_pin_" + pin.pin (예: "arduino-100_pin_4")
    if (pin.mode === 'read') {
      let globalVarName = arduino.arduinoID + "_pin_" + pin.pin;
      window[globalVarName] = checkbox.checked;
    }

    // write 핀인 경우 상태 변경 시 제어 명령 전송 및 글로벌 함수 생성 (on/off 분리)
    if (pin.mode === 'write') {
      // 체크박스 change 이벤트 (직접 조작 시)
      checkbox.addEventListener('change', () => {
        const newState = checkbox.checked ? 'on' : 'off';
        const commandMsg = {
          arduinoID: arduino.arduinoID,
          pin: pin.pin,
          command: newState
        };
        sendCommandWithRetry(commandMsg);
      });
      // 글로벌 함수 생성: on 함수와 off 함수 따로 생성
      let funcNameOn = arduino.arduinoID + "_pin_" + pin.pin + "_on";
      let funcNameOff = arduino.arduinoID + "_pin_" + pin.pin + "_off";
      window[funcNameOn] = function () {
        let checkbox = document.querySelector(`#card-${arduino.arduinoID}-pin-${pin.pin} input[type="checkbox"]`);
        if (checkbox) {
          checkbox.checked = true;
          const commandMsg = {
            arduinoID: arduino.arduinoID,
            pin: pin.pin,
            command: 'on'
          };
          sendCommandWithRetry(commandMsg);
        }
      }
      window[funcNameOff] = function () {
        let checkbox = document.querySelector(`#card-${arduino.arduinoID}-pin-${pin.pin} input[type="checkbox"]`);
        if (checkbox) {
          checkbox.checked = false;
          const commandMsg = {
            arduinoID: arduino.arduinoID,
            pin: pin.pin,
            command: 'off'
          };
          sendCommandWithRetry(commandMsg);
        }
      }
    }

    switchLabel.appendChild(checkbox);
    pinDiv.appendChild(pinText);
    pinDiv.appendChild(switchLabel);
    pinsContainer.appendChild(pinDiv);
  });
  card.appendChild(pinsContainer);
  return card;
}

// 전체 아두이노 정보 업데이트 (slave.html에서 받은 데이터)
function updateUI(data) {
  const container = document.getElementById('arduinoContainer');
  container.innerHTML = '';
  data.forEach(arduino => {
    slaveData[arduino.arduinoID] = arduino;
    const card = createArduinoCard(arduino);
    container.appendChild(card);
  });
}

// 명령을 보내고, 일정 간격으로 재전송하는 함수
function sendCommandWithRetry(commandMsg) {
  const key = commandMsg.arduinoID + '_' + commandMsg.pin;
  if (pendingCommands[key]) {
    clearInterval(pendingCommands[key].intervalId);
  }
  // 명령 즉시 전송
  channel.postMessage(commandMsg);
  // 2초 간격으로 재전송 (slave에서 상태 업데이트를 받으면 pending 명령 삭제)
  const intervalId = setInterval(() => {
    channel.postMessage(commandMsg);
  }, 2000);
  pendingCommands[key] = { command: commandMsg.command, intervalId };
}

// BroadcastChannel을 통해 slave.html로부터 메시지 수신
channel.onmessage = (event) => {
  lastSlaveMessageTime = Date.now();
  const data = event.data;
  // full update: slave.html에서 보내는 전체 슬레이브 정보
  if (data.type === 'slaveUpdate' && data.arduinos) {
    updateUI(data.arduinos);
    // pending 명령 중 slave에서 반영된 상태와 일치하면 재전송 중지
    data.arduinos.forEach(arduino => {
      arduino.pins.forEach(pin => {
        const key = arduino.arduinoID + '_' + pin.pin;
        if (pendingCommands[key] && pendingCommands[key].command === pin.state) {
          clearInterval(pendingCommands[key].intervalId);
          delete pendingCommands[key];
        }
        // read 핀인 경우 전역 변수 업데이트
        if (pin.mode === 'read') {
          let globalVarName = arduino.arduinoID + "_pin_" + pin.pin;
          window[globalVarName] = (pin.state === 'on');
        }
      });
    });
  }
};

// 주기적으로 slave와의 연결 상태 체크 (연결 끊겼으면 오버레이 표시)
// setInterval(() => {
//   const now = Date.now();
//   const overlay = document.getElementById('overlay');
//   if (now - lastSlaveMessageTime > RECONNECT_TIMEOUT) {
//     overlay.style.display = 'flex';
//   } else {
//     overlay.style.display = 'none';
//   }
// }, 1000);

// 주기적으로 heartbeat 전송 (연결 유지)
setInterval(() => {
  channel.postMessage({ type: 'heartbeat' });
}, 3000);

// 키보드 처리: Ctrl + S 키 조합으로 arduinoContainer 토글
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.code === "KeyS") {
    const container = document.getElementById("arduinoContainer");
    container.style.display = (container.style.display === "block" ? "none" : "block");
    event.preventDefault();
  }
});

function triggerPinOn(pinName) {
  const onName  = `${pinName}_on`;
  const onFunc  = window[onName];
  if (typeof onFunc === 'function') {
    onFunc();
  }
}

function triggerPinOff(pinName) {
  const onName  = `${pinName}_off`;
  const onFunc  = window[onName];
  if (typeof onFunc === 'function') {
    onFunc();
  }
}

function triggerPinOnAndOff(pinName) {
  const onName  = `${pinName}_on`;
  const offName = `${pinName}_off`;
  const onFunc  = window[onName];
  const offFunc = window[offName];
  if (typeof onFunc === 'function') {
    onFunc();
    console.log(`Triggering ${onName}`);
    if (typeof offFunc === 'function') {
      setTimeout(offFunc, 500);
      console.log(`Triggering ${offName}`);
    }
  }
}