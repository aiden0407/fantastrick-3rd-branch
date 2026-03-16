// 앱 초기화
window.onload = function() {
  console.log('앱 초기화');

  // 설정 모달 표시
  document.getElementById('configModal').style.display = 'flex';

  // 캔버스 초기화
  if (typeof initCanvas === 'function') {
    initCanvas();
  }

  // 리프레시 터치 영역 초기화
  if (typeof initRefreshTouchArea === 'function') {
    initRefreshTouchArea();
  }

  // DM 터치 영역 초기화
  if (typeof initDMTouchArea === 'function') {
    initDMTouchArea();
  }

  // 화면 가시성 변경 이벤트 (PWA 백그라운드/포그라운드)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      console.log('앱이 포그라운드로 전환됨');

      // WebSocket 재연결 (웹소켓 모드일 때만)
      if (connectionMode === 'websocket') {
        // WebSocket이 끊겼으면 재연결
        if (!ws || ws.readyState !== WebSocket.OPEN) {
          console.log('WebSocket 재연결 시도...');
          connectWebSocket();
        }
      }

      // 타이머 복구
      if (typeof restoreTimer === 'function') {
        restoreTimer();
      }
    } else {
      console.log('앱이 백그라운드로 전환됨');
    }
  });

  // 페이지 로드 시 타이머 복구 (앱 재시작 시)
  if (typeof restoreTimer === 'function') {
    restoreTimer();
  }
};
