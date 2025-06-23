// 디버그용 키보드 처리입니다. slave와 동일한 카드 ui를 생성합니다. 기본값 : ctrl + 키패드1
document.addEventListener('keydown', (event) => {
	if (event.ctrlKey && event.code === 'Numpad1') {
		const container = document.getElementById('arduinoContainer');
		container.style.display = container.style.display === 'block' ? 'none' : 'block';
		event.preventDefault();
	}
});

// BroadcastChannel 설정
const channel = new BroadcastChannel('arduino_channel');
let lastSlaveMessageTime = Date.now();
const RECONNECT_TIMEOUT = 5000;
const pendingCommands = {};
let slaveData = {};

// read 핀 상태 갱신 (변경된 핀만)
function updateMonitoredPins(changedPin = null) {
  if (changedPin) {
    console.log(`Updating single pin display: ${changedPin}`);
    updatePinDisplay(changedPin);
  } else {
    console.log('Updating all monitored pins');
    monitoredPins.forEach(updatePinDisplay);
  }
}

// 아두이노 카드 생성
function createArduinoCard(arduino) {
  console.log(`Creating card for arduino: ${arduino.arduinoID}`);
  const existingCard = document.querySelector(`.card[data-arduino-id="${arduino.arduinoID}"]`);
  if (existingCard) return existingCard;

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
    pinDiv.id = `card-${arduino.arduinoID}-pin-${pin.pin}`;
    
    const pinText = document.createElement('span');
    pinText.className = 'pin-text';
    pinText.innerText = `Pin ${pin.pin} - ${pin.nickname} (${pin.mode})`;
    
    const switchLabel = document.createElement('label');
    switchLabel.className = 'switch';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = pin.state === 'on';
    checkbox.disabled = pin.mode !== 'write';
    
    if (pin.mode === 'read') {
      const globalVarName = `${arduino.arduinoID}_pin_${pin.pin}`;
      window[globalVarName] = pin.state === 'on';
      updateMonitoredPins(globalVarName);
    }
    
    if (pin.mode === 'write') {
      checkbox.addEventListener('change', () => {
        const newState = checkbox.checked ? 'on' : 'off';
        const commandMsg = {
          arduinoID: arduino.arduinoID,
          pin: pin.pin,
          state: newState,
          command: newState // slave.html 호환성
        };
        console.log(`Checkbox changed: ${arduino.arduinoID}, Pin ${pin.pin}, State ${newState}`);
        sendCommandWithRetry(commandMsg);
      });
      const funcNameOn = `${arduino.arduinoID}_pin_${pin.pin}_on`;
      const funcNameOff = `${arduino.arduinoID}_pin_${pin.pin}_off`;
      window[funcNameOn] = function() {
        console.log(`Button clicked: ${funcNameOn}`);
        const currentCheckbox = document.querySelector(`#card-${arduino.arduinoID}-pin-${pin.pin} input[type="checkbox"]`);
        if (currentCheckbox) {
          currentCheckbox.checked = true;
          const commandMsg = {
            arduinoID: arduino.arduinoID,
            pin: pin.pin,
            state: 'on',
            command: 'on' // slave.html 호환성
          };
          sendCommandWithRetry(commandMsg);
        } else {
          console.error(`Checkbox not found for ${funcNameOn}`);
        }
      };
      window[funcNameOff] = function() {
        console.log(`Button clicked: ${funcNameOff}`);
        const currentCheckbox = document.querySelector(`#card-${arduino.arduinoID}-pin-${pin.pin} input[type="checkbox"]`);
        if (currentCheckbox) {
          currentCheckbox.checked = false;
          const commandMsg = {
            arduinoID: arduino.arduinoID,
            pin: pin.pin,
            state: 'off',
            command: 'off' // slave.html 호환성
          };
          sendCommandWithRetry(commandMsg);
        } else {
          console.error(`Checkbox not found for ${funcNameOff}`);
        }
      };
    }
    
    switchLabel.appendChild(checkbox);
    pinDiv.appendChild(pinText);
    pinDiv.appendChild(switchLabel);
    pinsContainer.appendChild(pinDiv);
  });
  card.appendChild(pinsContainer);
  return card;
}

// 전체 UI 업데이트
function updateUI(data) {
  console.log('Updating UI with data:', data);
  const container = document.getElementById('arduinoContainer');
  const existingArduinoIDs = new Set(Array.from(container.querySelectorAll('.card')).map(card => card.getAttribute('data-arduino-id')));
  
  data.forEach(arduino => {
    const existingArduino = slaveData[arduino.arduinoID];
    if (existingArduino) {
      const hasChanges = arduino.pins.some(pin => {
        const existingPin = existingArduino.pins.find(p => p.pin === pin.pin);
        return !existingPin || existingPin.state !== pin.state || existingPin.mode !== pin.mode || existingPin.nickname !== pin.nickname;
      });
      if (!hasChanges && existingArduino.arduinoNickname === arduino.arduinoNickname) {
        console.log(`Skipped unchanged arduino: ${arduino.arduinoID}`);
        return;
      }
    }
    
    slaveData[arduino.arduinoID] = JSON.parse(JSON.stringify(arduino));
    if (!existingArduinoIDs.has(arduino.arduinoID)) {
      const card = createArduinoCard(arduino);
      container.appendChild(card);
    } else {
      arduino.pins.forEach(pin => {
        updatePinState(arduino.arduinoID, pin.pin, pin.state);
      });
    }
  });
  
  existingArduinoIDs.forEach(id => {
    if (!data.some(arduino => arduino.arduinoID === id)) {
      removeArduino(id);
    }
  });
}

// 아두이노 추가
function addArduino(arduino) {
  if (!slaveData[arduino.arduinoID]) {
    console.log(`Adding arduino: ${arduino.arduinoID}`);
    slaveData[arduino.arduinoID] = JSON.parse(JSON.stringify(arduino));
    const container = document.getElementById('arduinoContainer');
    const card = createArduinoCard(arduino);
    container.appendChild(card);
  }
}

// 아두이노 제거
function removeArduino(arduinoID) {
  if (slaveData[arduinoID]) {
    console.log(`Removing arduino: ${arduinoID}`);
    delete slaveData[arduinoID];
    const card = document.querySelector(`.card[data-arduino-id="${arduinoID}"]`);
    if (card && card.parentNode) {
      card.parentNode.removeChild(card);
    }
  }
}

// 핀 상태 업데이트
function updatePinState(arduinoID, pinNumber, state) {
  const arduino = slaveData[arduinoID];
  if (arduino) {
    const pin = arduino.pins.find(p => p.pin === pinNumber);
    if (pin && pin.state === state) {
      console.log(`Skipped unchanged pin: ${arduinoID}, Pin ${pinNumber}`);
      return;
    }
    if (pin) pin.state = state;
  }
  
  const checkbox = document.querySelector(`#card-${arduinoID}-pin-${pinNumber} input[type="checkbox"]`);
  if (checkbox) {
    checkbox.checked = state === 'on';
  } else {
    console.warn(`Checkbox not found for ${arduinoID}, Pin ${pinNumber}`);
  }
  
  const globalVarName = `${arduinoID}_pin_${pinNumber}`;
  if (monitoredPins.includes(globalVarName)) {
    window[globalVarName] = state === 'on';
    updateMonitoredPins(globalVarName);
  }
  
  const key = `${arduinoID}_${pinNumber}`;
  if (pendingCommands[key] && pendingCommands[key].state === state) {
    clearInterval(pendingCommands[key].intervalId);
    delete pendingCommands[key];
  }
}

// 명령 전송 및 재전송
function sendCommandWithRetry(commandMsg) {
  const key = `${commandMsg.arduinoID}_${commandMsg.pin}`;
  console.log(`Sending command: ${key}, State ${commandMsg.state}`);
  const currentArduino = slaveData[commandMsg.arduinoID];
  
  if (currentArduino) {
    const currentPin = currentArduino.pins.find(p => p.pin === commandMsg.pin);
    if (currentPin && currentPin.state === commandMsg.state) {
      console.log(`Skipped redundant command: ${key}, State ${commandMsg.state}`);
      if (pendingCommands[key]) {
        clearInterval(pendingCommands[key].intervalId);
        delete pendingCommands[key];
      }
      return;
    }
  } else {
    console.warn(`Arduino not found in slaveData: ${commandMsg.arduinoID}`);
  }
  
  if (pendingCommands[key]) {
    clearInterval(pendingCommands[key].intervalId);
  }
  
  channel.postMessage(commandMsg);
  const intervalId = setInterval(() => {
    const arduino = slaveData[commandMsg.arduinoID];
    if (arduino) {
      const pin = arduino.pins.find(p => p.pin === commandMsg.pin);
      if (pin && pin.state === commandMsg.state) {
        clearInterval(intervalId);
        delete pendingCommands[key];
        return;
      }
    }
    console.log(`Retrying command: ${key}, State ${commandMsg.state}`);
    channel.postMessage(commandMsg);
  }, 5000);
  
  pendingCommands[key] = { state: commandMsg.state, intervalId };
}

// BroadcastChannel 메시지 처리
channel.onmessage = (event) => {
  lastSlaveMessageTime = Date.now();
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
  
  const data = event.data;
  if (!data) {
    console.error('Received empty message data');
    return;
  }
  
  try {
    if (data.type === 'slaveUpdate' && data.arduinos) {
      console.log('Received slaveUpdate:', data.arduinos);
      updateUI(data.arduinos);
    } else if (data.type === 'pinUpdate') {
      console.log(`Pin update: ${data.arduinoID}, Pin ${data.pin}, State ${data.state}`);
      updatePinState(data.arduinoID, data.pin, data.state);
    } else if (data.type === 'arduinoConnect') {
      console.log(`Arduino connected: ${data.arduinoID}`);
      const arduino = {
        arduinoID: data.arduinoID,
        arduinoNickname: data.arduinoNickname || '',
        pins: data.pins || []
      };
      addArduino(arduino);
    } else if (data.type === 'arduinoDisconnect') {
      console.log(`Arduino disconnected: ${data.arduinoID}`);
      removeArduino(data.arduinoID);
    } else {
      console.warn('Unknown message type:', data.type);
    }
  } catch (err) {
    console.error('Error processing BroadcastChannel message:', err.message, data);
  }
};

// 주기적 연결 상태 체크
setInterval(() => {
  const now = Date.now();
  const overlay = document.getElementById('overlay');
  if (now - lastSlaveMessageTime > RECONNECT_TIMEOUT) {
    overlay.style.display = 'flex';
  } else {
    overlay.style.display = 'none';
  }
}, 10000);

// 주기적 heartbeat 전송
setInterval(() => {
  console.log('Sending heartbeat');
  channel.postMessage({ type: 'heartbeat' });
}, 5000);

// 페이지 로드 시 초기화
window.addEventListener('DOMContentLoaded', () => {
  console.log('Page loaded, sending initial heartbeat');
  channel.postMessage({ type: 'heartbeat' });
  updateMonitoredPins();
});

// 트리거 함수 - write핀을 제어
function triggerPinOn(pinName) {
  const onFunc = window[`${pinName}_on`];
  if (typeof onFunc === 'function') {
    onFunc();
  }
}

function triggerPinOff(pinName) {
  const offFunc = window[`${pinName}_off`];
  if (typeof offFunc === 'function') {
    offFunc();
  }
}

function triggerPinOnAndOff(pinName) {
  const onFunc = window[`${pinName}_on`];
  const offFunc = window[`${pinName}_off`];
  if (typeof onFunc === 'function') {
    onFunc();
    if (typeof offFunc === 'function') {
      setTimeout(offFunc, 500);
    }
  }
}

function fadeOutAudio(audio, duration) {
  const startVolume = audio.volume;
  const fadeSteps = 50;
  const stepTime = duration / fadeSteps;
  const volumeStep = startVolume / fadeSteps;

  let currentStep = 0;
  const fadeInterval = setInterval(() => {
    currentStep++;
    const newVol = Math.max(startVolume - volumeStep * currentStep, 0);
    audio.volume = newVol;

    if (currentStep >= fadeSteps) {
      clearInterval(fadeInterval);
      audio.pause();
      audio.currentTime = 0;
    }
  }, stepTime);
}