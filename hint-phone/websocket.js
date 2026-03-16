// WebSocket 설정
let ws = null;
const wsURL = 'ws://192.168.100.4:8080';
let connectionMode = null; // 초기값 null: 사용자가 선택할 때까지 연결하지 않음
let testChannel = null;

// 재연결 관련 변수
let reconnectInterval = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;
const initialReconnectDelay = 1000; // 1초
const maxReconnectDelay = 30000; // 30초

// 연결 모드 선택 및 연결
function connectMode(mode) {
  connectionMode = mode;

  document.getElementById('configModal').style.display = 'none';

  if (connectionMode === 'websocket') {
    connectWebSocket();
  } else {
    initTestMode();
  }
}

// WebSocket 자동 재연결 함수
function scheduleReconnect() {
  // 이미 재연결 중이면 중복 실행 방지
  if (reconnectInterval) {
    clearTimeout(reconnectInterval);
  }

  // 최대 재연결 시도 횟수 체크
  if (reconnectAttempts >= maxReconnectAttempts) {
    updateStatus('최대 재연결 시도 초과');
    console.error('WebSocket 재연결 실패: 최대 시도 횟수 초과');
    return;
  }

  // 지수 백오프: 재연결 시도마다 대기 시간 증가
  const delay = Math.min(initialReconnectDelay * Math.pow(2, reconnectAttempts), maxReconnectDelay);

  console.log(`${delay/1000}초 후 재연결 시도 (${reconnectAttempts + 1}/${maxReconnectAttempts})`);

  reconnectInterval = setTimeout(() => {
    if (connectionMode === 'websocket') {
      reconnectAttempts++;
      connectWebSocket();
    }
  }, delay);
}

// WebSocket 연결
function connectWebSocket() {
  // 기존 연결이 있으면 정리
  if (ws) {
    ws.onclose = null; // 재연결 중복 방지
    ws.close();
  }

  updateStatus('연결 중...');

  try {
    ws = new WebSocket(wsURL);
  } catch (error) {
    console.error('WebSocket 생성 실패:', error);
    scheduleReconnect();
    return;
  }

  ws.onopen = () => {
    console.log('WebSocket 연결됨');
    updateStatus('WebSocket 연결됨');

    // 연결 성공 시 빨간 점 숨기기
    const indicator = document.getElementById('connectionIndicator');
    if (indicator) {
      indicator.style.display = 'none';
    }

    // 연결 성공 시 재연결 카운터 초기화
    reconnectAttempts = 0;
    if (reconnectInterval) {
      clearTimeout(reconnectInterval);
      reconnectInterval = null;
    }

    ws.send(JSON.stringify({ type: 'master' }));

    // 타이머 복구 (앱이 백그라운드에서 돌아왔을 때)
    if (typeof restoreTimer === 'function') {
      restoreTimer();
    }
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      handleWebSocketMessage(data);
    } catch (error) {
      console.error('메시지 파싱 오류:', error);
    }
  };

  ws.onclose = (event) => {
    console.log('WebSocket 연결 종료:', event.code, event.reason);
    updateStatus('연결 끊김');

    // 연결 끊김 시 빨간 점 표시
    const indicator = document.getElementById('connectionIndicator');
    if (indicator && connectionMode === 'websocket') {
      indicator.style.display = 'block';
    }

    // 정상 종료가 아닌 경우에만 재연결
    if (event.code !== 1000 && connectionMode === 'websocket') {
      scheduleReconnect();
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket 오류:', error);
    updateStatus('연결 오류');

    // 오류 시에도 빨간 점 표시
    const indicator = document.getElementById('connectionIndicator');
    if (indicator && connectionMode === 'websocket') {
      indicator.style.display = 'block';
    }

    // onerror 후 onclose가 호출되므로 여기서는 재연결하지 않음
  };
}

// WebSocket 메시지 처리
function handleWebSocketMessage(data) {
  switch(data.type) {
    case 'update':
      if (data.updates) {
        data.updates.forEach(update => {
          checkPinStatus(data.slaveID, data.arduinoID, update.pin, update.state);
        });
      }
      break;
    case 'slaveRegister':
      if (data.arduinos) {
        data.arduinos.forEach(arduino => {
          arduino.pins.forEach(pin => {
            checkPinStatus(data.slaveID, arduino.arduinoID, pin.pin, pin.state);
          });
        });
      }
      break;
    case 'pin_change':
      // 테스트 모드에서 받은 핀 변경 이벤트
      if (data.data) {
        checkPinStatus(data.data.slaveID, data.data.arduinoID, data.data.pinNumber, data.data.state);
      }
      break;
  }
}

// 테스트 모드 초기화
function initTestMode() {
  console.log('테스트 모드 활성화');
  updateStatus('테스트 모드');

  // 연결 인디케이터 숨기기
  const indicator = document.getElementById('connectionIndicator');
  if (indicator) {
    indicator.style.display = 'none';
  }

  // BroadcastChannel 생성
  testChannel = new BroadcastChannel('pin_control_channel');

  testChannel.onmessage = function(event) {
    console.log('테스트 채널 메시지:', event.data);
    handleWebSocketMessage(event.data);
  };
}

// 상태 업데이트 (콘솔)
function updateStatus(message) {
  console.log('[상태]', message);
}
