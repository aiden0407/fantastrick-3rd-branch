let pinProgress = {
  streetmegaPin22: false,
  safehousePin23: false,
  safehousePin25: false,
  safehousePin27: false,
  disinfectPin23: false,
  streetmegaPin23: false,
  streetmegaPin24: false,
  barPin23: false,
  barPin26: false,
  barPin31: false,
  streetmegaPin23_2nd: false,
  disinfectPin34: false,
  safehousePin24: false,
  safehousePin28: false,
  safehousePin24_2nd: false,
  safehousePin30: false,
  streetmegaPin23_3rd: false,
  doctorPin27: false,
  doctorPin24: false,
  doctorPin26: false,
  streetmegaPin26: false,

  // cctv 업적
  streetmegaPin28: false,
  streetmegaPin29: false,
  streetmegaPin30: false,
  streetmegaPin31: false,
  streetmegaPin32: false,
  // collector 업적
  streetmegaPin33: false,
  // lie 업적
  streetmegaPin34: false,
  // last 업적
  streetmegaPin35: false,
  // follow 업적
  streetmegaPin36: false,
  // wedding 업적
  streetmegaPin37: false,
  // name 업적
  streetmegaPin38: false,
  // pocket 업적
  streetmegaPin40: false,
  // roch 업적
  streetmegaPin42: false,
};

// 타겟 핀 정의
const TARGET_PIN = {
  slaveID: 'streetmega',
  arduinoID: 'streetmega-2',
  pinNumber: 22
};

// 두 번째 타겟 핀 정의 (safemega-1의 pin23)
const TARGET_PIN_2 = {
  slaveID: 'safehouse',
  arduinoID: 'safemega-1',
  pinNumber: 23
};

// 세 번째 타겟 핀 정의 (safemega-1의 pin25)
const TARGET_PIN_3 = {
  slaveID: 'safehouse',
  arduinoID: 'safemega-1',
  pinNumber: 25
};

// 네 번째 타겟 핀 정의 (safemega-1의 pin27)
const TARGET_PIN_4 = {
  slaveID: 'safehouse',
  arduinoID: 'safemega-1',
  pinNumber: 27
};

// 다섯 번째 타겟 핀 정의 (disinfectmega-2의 pin23)
const TARGET_PIN_5 = {
  slaveID: 'disinfectmega-1',
  arduinoID: 'disinfectmega-2',
  pinNumber: 23
};

// 여섯 번째 타겟 핀 정의 (streetmega-2의 pin23)
const TARGET_PIN_6 = {
  slaveID: 'streetmega',
  arduinoID: 'streetmega-2',
  pinNumber: 23
};

// 일곱 번째 타겟 핀 정의 (streetmega-2의 pin24)
const TARGET_PIN_7 = {
  slaveID: 'streetmega',
  arduinoID: 'streetmega-2',
  pinNumber: 24
};

// 여덟 번째 타겟 핀 정의 (barmega-1의 pin23)
const TARGET_PIN_8 = {
  slaveID: 'BAR',
  arduinoID: 'barmega-1',
  pinNumber: 23
};

// 아홉 번째 타겟 핀 정의 (barmega-1의 pin26)
const TARGET_PIN_9 = {
  slaveID: 'BAR',
  arduinoID: 'barmega-1',
  pinNumber: 26
};

// 아홉 번째 타겟 핀 정의 (barmega-1의 pin26)
const TARGET_PIN_10 = {
  slaveID: 'BAR',
  arduinoID: 'barmega-1',
  pinNumber: 31
};

// 타겟 핀 정의 (disinfectmega-2의 pin34)
const TARGET_PIN_14 = {
  slaveID: 'disinfectmega-1',
  arduinoID: 'disinfectmega-2',
  pinNumber: 34
};

// 열다섯 번째 타겟 핀 정의 (safemega-1의 pin24)
const TARGET_PIN_15 = {
  slaveID: 'safehouse',
  arduinoID: 'safemega-1',
  pinNumber: 24
};

// 열여섯 번째 타겟 핀 정의 (safemega-1의 pin28)
const TARGET_PIN_16 = {
  slaveID: 'safehouse',
  arduinoID: 'safemega-1',
  pinNumber: 28
};

// 열일곱 번째 타겟 핀 정의 (safemega-1의 pin30)
const TARGET_PIN_17 = {
  slaveID: 'safehouse',
  arduinoID: 'safemega-1',
  pinNumber: 30
};

// 열여덟 번째 타겟 핀 정의 (doctormega-1의 pin27)
const TARGET_PIN_18 = {
  slaveID: 'doctor',
  arduinoID: 'doctormega-1',
  pinNumber: 27
};

// 열아홉 번째 타겟 핀 정의 (doctormega-1의 pin24)
const TARGET_PIN_19 = {
  slaveID: 'doctor',
  arduinoID: 'doctormega-1',
  pinNumber: 24
};

// 스무 번째 타겟 핀 정의 (doctormega-1의 pin26)
const TARGET_PIN_20 = {
  slaveID: 'doctor',
  arduinoID: 'doctormega-1',
  pinNumber: 26
};

// 스물한 번째 타겟 핀 정의 (streetmega-2의 pin26)
const TARGET_PIN_21 = {
  slaveID: 'streetmega',
  arduinoID: 'streetmega-2',
  pinNumber: 26
};

// 타이머 변수
let timerInterval = null;
let timeRemaining = 6000; // 1:40:00 = 100분 = 6000초
let endTime = null; // 타이머 종료 시간

// SNS 활성화 상태
let isSNSActivated = false;
// SNS dm 버튼 활성화 상태
let isSNSDMActivated = false;

function checkPinStatus(slaveID, arduinoID, pinNumber, state) {
  // pinNumber를 숫자로 변환
  pinNumber = parseInt(pinNumber);

  // TARGET_PIN_1: streetmega-2 pin22
  if (slaveID === TARGET_PIN.slaveID && arduinoID === TARGET_PIN.arduinoID && pinNumber === TARGET_PIN.pinNumber && state === 'on' && !pinProgress.streetmegaPin22) {
    console.log(`타겟 핀 감지 (pin22)`);
    pinProgress.streetmegaPin22 = true;
    updateToVersion0();
  }

  // TARGET_PIN_2: safemega-1 pin23
  if (slaveID === TARGET_PIN_2.slaveID && arduinoID === TARGET_PIN_2.arduinoID && pinNumber === TARGET_PIN_2.pinNumber && state === 'on' && !pinProgress.safehousePin23) {
    console.log(`타겟 핀 감지 (safehouse pin23)`);
    pinProgress.safehousePin23 = true;
    showMissionScreen();
    updateToVersion1();
  }

  // TARGET_PIN_3: safemega-1 pin25
  if (slaveID === TARGET_PIN_3.slaveID && arduinoID === TARGET_PIN_3.arduinoID && pinNumber === TARGET_PIN_3.pinNumber && state === 'on' && !pinProgress.safehousePin25) {
    console.log(`타겟 핀 감지 (safehouse pin25)`);
    pinProgress.safehousePin25 = true;
    showMissionScreen();
    updateToVersion2();
  }

  // TARGET_PIN_4: safemega-1 pin27
  if (slaveID === TARGET_PIN_4.slaveID && arduinoID === TARGET_PIN_4.arduinoID && pinNumber === TARGET_PIN_4.pinNumber && state === 'on' && !pinProgress.safehousePin27) {
    console.log(`타겟 핀 감지 (safehouse pin27)`);
    pinProgress.safehousePin27 = true;
    showMissionScreen();
    updateToVersion3();
  }

  // TARGET_PIN_5: disinfectmega-2 pin23
  if (slaveID === TARGET_PIN_5.slaveID && arduinoID === TARGET_PIN_5.arduinoID && pinNumber === TARGET_PIN_5.pinNumber && state === 'on' && !pinProgress.disinfectPin23) {
    console.log(`타겟 핀 감지 (disinfect pin23)`);
    pinProgress.disinfectPin23 = true;
    showMissionScreen();
    updateDetailsToVersion3_2();
  }

  // TARGET_PIN_6: streetmega-2 pin23 (3번 사용)
  if (slaveID === TARGET_PIN_6.slaveID && arduinoID === TARGET_PIN_6.arduinoID && pinNumber === TARGET_PIN_6.pinNumber && state === 'on') {
    // 첫번째
    if (!pinProgress.streetmegaPin23 && !(pinProgress.streetmegaPin24 || pinProgress.barPin23 || pinProgress.barPin26 || pinProgress.barPin31 || pinProgress.disinfectPin34 || pinProgress.safehousePin24 || pinProgress.safehousePin28 || pinProgress.safehousePin30)) {
      console.log(`타겟 핀 감지 (streetmega pin23 - 1st)`);
      pinProgress.streetmegaPin23 = true;
      showMissionScreen();
      updateToVersion4();
    }
    // 두번째
    else if (!pinProgress.streetmegaPin23_2nd && (pinProgress.streetmegaPin24 || pinProgress.barPin23 || pinProgress.barPin26 || pinProgress.barPin31)) {
      console.log(`타겟 핀 감지 (streetmega pin23 - 2nd)`);
      pinProgress.streetmegaPin23_2nd = true;
      showMissionScreen();
      updateDetailsToVersion6_2();
    }
    // 세번째
    else if (!pinProgress.streetmegaPin23_3rd && (pinProgress.disinfectPin34 || pinProgress.safehousePin24 || pinProgress.safehousePin28 || pinProgress.safehousePin30)) {
      console.log(`타겟 핀 감지 (streetmega pin23 - 3rd)`);
      pinProgress.streetmegaPin23_3rd = true;
      showMissionScreen();
      updateDetailsToVersion9_2();
    }
  }

  // TARGET_PIN_7: streetmega-2 pin24
  if (slaveID === TARGET_PIN_7.slaveID && arduinoID === TARGET_PIN_7.arduinoID && pinNumber === TARGET_PIN_7.pinNumber && state === 'on' && !pinProgress.streetmegaPin24) {
    console.log(`타겟 핀 감지 (streetmega pin24)`);
    pinProgress.streetmegaPin24 = true;
    showMissionScreen();
    updateDetailsToVersion4_2();
  }

  // TARGET_PIN_8: barmega-1 pin23
  if (slaveID === TARGET_PIN_8.slaveID && arduinoID === TARGET_PIN_8.arduinoID && pinNumber === TARGET_PIN_8.pinNumber && state === 'on' && !pinProgress.barPin23) {
    console.log(`타겟 핀 감지 (BAR pin23)`);
    pinProgress.barPin23 = true;
    showMissionScreen();
    updateToVersion4_3();
  }

  // TARGET_PIN_9: barmega-1 pin26
  if (slaveID === TARGET_PIN_9.slaveID && arduinoID === TARGET_PIN_9.arduinoID && pinNumber === TARGET_PIN_9.pinNumber && state === 'on' && !pinProgress.barPin26) {
    console.log(`타겟 핀 감지 (BAR pin26)`);
    pinProgress.barPin26 = true;
    showMissionScreen();
    clearMissionAndDetails();
  }

  // TARGET_PIN_10: barmega-1 pin31
  if (slaveID === TARGET_PIN_10.slaveID && arduinoID === TARGET_PIN_10.arduinoID && pinNumber === TARGET_PIN_10.pinNumber && state === 'on' && !pinProgress.barPin31) {
    console.log(`타겟 핀 감지 (BAR pin31)`);
    pinProgress.barPin31 = true;
    showMissionScreen();
    updateToVersion6();
  }

  // TARGET_PIN_14: disinfectmega-2 pin34
  if (slaveID === TARGET_PIN_14.slaveID && arduinoID === TARGET_PIN_14.arduinoID && pinNumber === TARGET_PIN_14.pinNumber && state === 'on' && !pinProgress.disinfectPin34) {
    console.log(`타겟 핀 감지 (disinfect pin34)`);
    pinProgress.disinfectPin34 = true;
    showMissionScreen();
    updateDetailsToVersion6_3();
  }

  // TARGET_PIN_15: safemega-1 pin24
  if (slaveID === TARGET_PIN_15.slaveID && arduinoID === TARGET_PIN_15.arduinoID && pinNumber === TARGET_PIN_15.pinNumber && state === 'on') {
    console.log(`타겟 핀 감지 (safehouse pin24)`);
    if(!pinProgress.safehousePin24){
      pinProgress.safehousePin24 = true;
      showMissionScreen();
      updateToVersion7();
    } else if(pinProgress.safehousePin28 && !pinProgress.safehousePin24_2nd){
      // SNS dm 버튼 활성화
      playSound('assets/sound/ding.ogg');
      isSNSDMActivated = true;
      const snsDot = document.getElementById('snsDot');
      snsDot.style.display = 'block';
      const snsDMBtn = document.getElementById('snsDMBtn');
      snsDMBtn.src = 'assets/sns-img/dm_button_new.png';
      const dmContainer = document.getElementById('no-dm');
      dmContainer.style.display = 'none';
      const dmDetail = document.getElementById('dm-detail');
      dmDetail.style.display = 'block';
    }
  }

  // TARGET_PIN_16: safemega-1 pin28
  if (slaveID === TARGET_PIN_16.slaveID && arduinoID === TARGET_PIN_16.arduinoID && pinNumber === TARGET_PIN_16.pinNumber && state === 'on' && !pinProgress.safehousePin28) {
    console.log(`타겟 핀 감지 (safehouse pin28)`);
    pinProgress.safehousePin28 = true;
    showMissionScreen();
    updateToVersion8();
  }

  // TARGET_PIN_17: safemega-1 pin30
  if (slaveID === TARGET_PIN_17.slaveID && arduinoID === TARGET_PIN_17.arduinoID && pinNumber === TARGET_PIN_17.pinNumber && state === 'on' && !pinProgress.safehousePin30) {
    console.log(`타겟 핀 감지 (safehouse pin30)`);
    // SNS 버튼 비활성화
    const snsImg = document.getElementById('sns-button');
    if (snsImg) {
      snsImg.src = 'assets/phone-img/SNS-deactivate.png';
      isSNSActivated = false;
    }
    pinProgress.safehousePin30 = true;
    showMissionScreen();
    updateToVersion9();
  }

  // TARGET_PIN_18: doctormega-1 pin27
  if (slaveID === TARGET_PIN_18.slaveID && arduinoID === TARGET_PIN_18.arduinoID && pinNumber === TARGET_PIN_18.pinNumber && state === 'on' && !pinProgress.doctorPin27) {
    console.log(`타겟 핀 감지 (doctor pin27)`);
    pinProgress.doctorPin27 = true;
    showMissionScreen();
    updateToVersion10();
  }

  // TARGET_PIN_19: doctormega-1 pin24
  if (slaveID === TARGET_PIN_19.slaveID && arduinoID === TARGET_PIN_19.arduinoID && pinNumber === TARGET_PIN_19.pinNumber && state === 'on' && !pinProgress.doctorPin24) {
    console.log(`타겟 핀 감지 (doctor pin24)`);
    pinProgress.doctorPin24 = true;
    showMissionScreen();
    updateDetailsToVersion10_2();
  }

  // TARGET_PIN_20: doctormega-1 pin26
  if (slaveID === TARGET_PIN_20.slaveID && arduinoID === TARGET_PIN_20.arduinoID && pinNumber === TARGET_PIN_20.pinNumber && state === 'on' && !pinProgress.doctorPin26) {
    console.log(`타겟 핀 감지 (doctor pin26)`);
    pinProgress.doctorPin26 = true;
    showMissionScreen();
    updateToVersion11();
  }

  // TARGET_PIN_21: streetmega-2 pin26 (엔딩)
  if (slaveID === TARGET_PIN_21.slaveID && arduinoID === TARGET_PIN_21.arduinoID && pinNumber === TARGET_PIN_21.pinNumber && state === 'on' && !pinProgress.streetmegaPin26) {
    console.log(`타겟 핀 감지 (streetmega pin26 - 엔딩)`);
    pinProgress.streetmegaPin26 = true;
    showMissionScreen();
    showEndingScreen();

    const lockQuest = document.getElementById('lock-quest');
    lockQuest.style.opacity = '1';
    showQuestToast('락다운 해제');
  }

  // QUEST PIN
  if (slaveID === 'streetmega' && arduinoID === 'streetmega-2' && pinNumber >= 28 && state === 'on') {
    switch (pinNumber) {
      case 28:
      case 29:
      case 30:
      case 31:
      case 32:
        console.log(`퀘스트 핀 감지 (streetmega pin${pinNumber})`);
        pinProgress[`streetmegaPin${pinNumber}`] = true;
        
        // 28~32번 핀이 모두 켜졌는지 확인
        // if (pinProgress.streetmegaPin28 && 
        //     pinProgress.streetmegaPin29 && 
        //     pinProgress.streetmegaPin30 && 
        //     pinProgress.streetmegaPin31 && 
        //     pinProgress.streetmegaPin32) {
        //   const cctvQuest = document.getElementById('cctv-quest');
        //   if (cctvQuest.style.opacity !== '1') {
        //     cctvQuest.style.opacity = '1';
        //     console.log('CCTV 퀘스트 활성화 (pin 28-32 모두 완료)');
        //     showQuestToast('보는 눈이 많아');
        //   }
        // }
        // break;

        // CCTV 3,4,5번 핀이 모두 켜졌는지 확인
        if (
            pinProgress.streetmegaPin30 && 
            pinProgress.streetmegaPin31 && 
            pinProgress.streetmegaPin32) {
          const cctvQuest = document.getElementById('cctv-quest');
          if (cctvQuest.style.opacity !== '1') {
            cctvQuest.style.opacity = '1';
            console.log('CCTV 퀘스트 활성화 (pin 28-32 모두 완료)');
            showQuestToast('보는 눈이 많아');
          }
        }
        break;

      case 33:
        console.log(`퀘스트 핀 감지 (streetmega pin33)`);
        if (!pinProgress.streetmegaPin33) {
          pinProgress.streetmegaPin33 = true;
          const collectorQuest = document.getElementById('collector-quest');
          collectorQuest.style.opacity = '1';
          showQuestToast('폐허의 수집가');
        }
        break;

      case 34:
        console.log(`퀘스트 핀 감지 (streetmega pin34)`);
        if (!pinProgress.streetmegaPin34) {
          pinProgress.streetmegaPin34 = true;
          const lieQuest = document.getElementById('lie-quest');
          lieQuest.style.opacity = '1';
          showQuestToast('거짓된 행운');
        }
        break;

      case 35:
        console.log(`퀘스트 핀 감지 (streetmega pin35)`);
        if (!pinProgress.streetmegaPin35) {
          pinProgress.streetmegaPin35 = true;
          const lastQuest = document.getElementById('last-quest');
          lastQuest.style.opacity = '1';
          showQuestToast('꼭 마지막에 되더라');
        }
        break;

      case 36:
        console.log(`퀘스트 핀 감지 (streetmega pin36)`);
        if (!pinProgress.streetmegaPin36) {
          pinProgress.streetmegaPin36 = true;
          const followQuest = document.getElementById('follow-quest');
          followQuest.style.opacity = '1';
          showQuestToast('새 친구를 사귀어 보자');
        }
        break;

      case 37:
        console.log(`퀘스트 핀 감지 (streetmega pin37)`);
        if (!pinProgress.streetmegaPin37) {
          pinProgress.streetmegaPin37 = true;
          const weddingQuest = document.getElementById('wedding-quest');
          weddingQuest.style.opacity = '1';
          showQuestToast('죽음이 우릴 갈라놓을 때까지');
        }
        break;

      case 38:
        console.log(`퀘스트 핀 감지 (streetmega pin38)`);
        if (!pinProgress.streetmegaPin38) {
          pinProgress.streetmegaPin38 = true;
          const nameQuest = document.getElementById('name-quest');
          nameQuest.style.opacity = '1';
          showQuestToast('너의 이름은');
        }
        break;

      case 40:
        console.log(`퀘스트 핀 감지 (streetmega pin40)`);
        if (!pinProgress.streetmegaPin40) {
          pinProgress.streetmegaPin40 = true;
          const pocketQuest = document.getElementById('pocket-quest');
          pocketQuest.style.opacity = '1';
          showQuestToast('주머니 속 진실');
        }
        break;

      case 42:
        console.log(`퀘스트 핀 감지 (streetmega pin42)`);
        if (!pinProgress.streetmegaPin42) {
          pinProgress.streetmegaPin42 = true;
          const rochQuest = document.getElementById('roch-quest');
          rochQuest.style.opacity = '1';
          showQuestToast('Roch down in city');
        }
        break;

      default:
        console.log(`기타 퀘스트 핀 감지 (streetmega pin${pinNumber})`);
        break;
    }
  }
}

// 미션 화면 표시 상태
let isStarted = false;

// 미션 화면 표시
function showMissionScreen() {
  if(isStarted) return;
  isStarted = true;

  // 배경 이미지만 교체
  const bgImage = document.getElementById('backgroundImage');
  bgImage.src = 'assets/phone-img/background.png';
  
  // 이미지 로드 완료 후 즉시 UI 요소 표시
  bgImage.onload = function() {
    console.log('배경 이미지 변경 완료');
    
    // 즉시 UI 요소들 표시 (타이머 제외)
    document.querySelector('.timer-overlay').style.display = 'block';
    document.querySelector('.memo-img').style.display = 'block';
    document.querySelector('.hint-img').style.display = 'block';
    document.querySelector('.sns-img').style.display = 'block';
    document.querySelector('.quest-button').style.display = 'block';

    // 미션 정보 이미지들 표시 (애니메이션과 함께)
    const missionImg = document.querySelector('.mission-img');
    const detailsImg = document.querySelector('.details-img');
    const locationImg = document.querySelector('.location-current');
    const inprogressImg = document.querySelector('.inprogress-img');
    
    // opacity 초기화
    missionImg.style.opacity = '0';
    detailsImg.style.opacity = '0';
    locationImg.style.opacity = '0';
    
    missionImg.style.display = 'block';
    detailsImg.style.display = 'block';
    inprogressImg.style.display = 'block';
    locationImg.style.display = 'block';

    requestAnimationFrame(() => {
      missionImg.classList.add('show');
      detailsImg.classList.add('show');
      locationImg.classList.add('show');
    });

    updateTimerDisplay();
    startTimer();
  };
}

function updateToVersion0() {
  isStarted = true;

  // 배경 이미지만 교체
  const bgImage = document.getElementById('backgroundImage');
  bgImage.src = 'assets/phone-img/background.png';
  
  // 이미지 로드 완료 후 즉시 UI 요소 표시
  bgImage.onload = function() {
    console.log('배경 이미지 변경 완료');
    
    // 즉시 UI 요소들 표시 (타이머 제외)
    document.querySelector('.timer-overlay').style.display = 'block';
    document.querySelector('.memo-img').style.display = 'block';
    document.querySelector('.hint-img').style.display = 'block';
    document.querySelector('.sns-img').style.display = 'block';
    document.querySelector('.quest-button').style.display = 'block';

    // 타이머는 1:40:00으로 표시만 (시작하지 않음)
    updateTimerDisplay();
    
    // 두 번째 사운드를 위한 오디오 객체 미리 생성
    const delayedAudio = new Audio('assets/sound/mission.mp3');
    delayedAudio.volume = 1.0;
    delayedAudio.load(); // 미리 로드
    
    // 137초 후에 미션 정보와 타이머 시작
    setTimeout(() => {
      // 미리 준비한 오디오 재생
      delayedAudio.play()
        .then(() => console.log('[delayedAudio] 효과음 재생 성공'))
        .catch(err => console.error('[delayedAudio] 효과음 재생 실패:', err));
      
      // 미션 정보 이미지들 표시 (애니메이션과 함께)
      const missionImg = document.querySelector('.mission-img');
      const detailsImg = document.querySelector('.details-img');
      
      // opacity 초기화
      missionImg.style.opacity = '0';
      detailsImg.style.opacity = '0';
      
      const locationImg = document.querySelector('.location-current');
      const inprogressImg = document.querySelector('.inprogress-img');
      locationImg.style.opacity = '0';
      
      missionImg.style.display = 'block';
      detailsImg.style.display = 'block';
      inprogressImg.style.display = 'block';
      locationImg.style.display = 'block';
      
      // 애니메이션 클래스 추가 (inprogress 제외)
      requestAnimationFrame(() => {
        missionImg.classList.add('show');
        detailsImg.classList.add('show');
        locationImg.classList.add('show');
      });

      // 타이머 시작
      startTimer();
      console.log('미션 정보 표시 및 타이머 시작');
    }, 137000); // 137초 딜레이
  };
  
  console.log('미션 화면 활성화 시작');
}

// 타이머 시작
function startTimer() {
  if (timerInterval) clearInterval(timerInterval);

  // 종료 시간 설정 (현재 시간 + 남은 시간)
  endTime = Date.now() + (timeRemaining * 1000);

  updateTimerDisplay(); // 초기 표시

  timerInterval = setInterval(() => {
    // 현재 시간과 종료 시간의 차이로 남은 시간 계산
    const now = Date.now();
    const remainingMs = endTime - now;

    if (remainingMs <= 0) {
      clearInterval(timerInterval);
      timeRemaining = 0;
      showTimeout();
    } else {
      timeRemaining = Math.ceil(remainingMs / 1000);
      updateTimerDisplay();
    }
  }, 1000);
}

// 타이머 복구 (화면 꺼졌다 켜졌을 때)
function restoreTimer() {
  // endTime이 설정되어 있으면 타이머가 이미 시작된 상태
  if (endTime) {
    const now = Date.now();
    const remainingMs = endTime - now;

    if (remainingMs > 0) {
      timeRemaining = Math.ceil(remainingMs / 1000);
      console.log('타이머 복구됨:', timeRemaining, '초 남음');

      // 타이머 인터벌 재시작
      if (timerInterval) clearInterval(timerInterval);

      timerInterval = setInterval(() => {
        const now = Date.now();
        const remainingMs = endTime - now;

        if (remainingMs <= 0) {
          clearInterval(timerInterval);
          timeRemaining = 0;
          showTimeout();
        } else {
          timeRemaining = Math.ceil(remainingMs / 1000);
          updateTimerDisplay();
        }
      }, 1000);

      updateTimerDisplay();
    } else {
      // 타이머가 이미 종료됨
      timeRemaining = 0;
      showTimeout();
    }
  }
}

// 타이머 표시 업데이트
function updateTimerDisplay() {
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  
  const display = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  const timerElement = document.getElementById('timer');
  if (timerElement) {
    timerElement.textContent = display;
    
    // 시간이 3600초(1시간) 이상이면 클래스 추가
    const timerOverlay = document.querySelector('.timer-overlay');
    if (timerOverlay) {
      if (timeRemaining >= 3600) {
        timerOverlay.classList.add('hour-plus');
      } else {
        timerOverlay.classList.remove('hour-plus');
      }
    }
  }
}

// 타임아웃 표시
function showTimeout() {
  const timerElement = document.getElementById('timer');
  const timerOverlay = document.querySelector('.timer-overlay');
  
  if (timerElement) {
    timerElement.textContent = 'TIME OUT';
  }
  
  if (timerOverlay) {
    timerOverlay.classList.add('timeout');
  }
}

// 공통 함수: 효과음 재생
function playSound(soundPath = 'assets/sound/mission.mp3') {
  console.log(`[playSound] 효과음 재생 시도: ${soundPath}`);
  try {
    const audio = new Audio(soundPath);
    
    // 모바일에서 오디오 재생을 위한 설정
    audio.volume = 1.0;
    audio.muted = false;
    
    // Promise를 사용하여 재생 시도
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('효과음 재생 성공:', soundPath);
        })
        .catch(error => {
          console.error('효과음 재생 오류:', error);
          console.error('오류 타입:', error.name);
          console.error('오류 메시지:', error.message);
          
          // NotAllowedError는 사용자 상호작용이 필요함을 의미
          if (error.name === 'NotAllowedError') {
            console.warn('사용자 상호작용이 필요합니다. 효과음을 재생할 수 없습니다.');
          }
        });
    }
  } catch (error) {
    console.error('오디오 생성 오류:', error);
  }
}

// 공통 함수: 이미지 숨기기
function hideImage(element, playAudio = true) {
  if (!element) return;
  
  element.classList.remove('show');
  element.classList.add('hide');
  
  if (playAudio) {
    playSound();
  }
  
  setTimeout(() => {
    element.style.display = 'none';
  }, 600);
}

// 공통 함수: 이미지 표시하기
function showImage(element, src = null, playAudio = true) {
  if (!element) return;
  
  if (src) {
    element.src = src;
  }
  
  element.classList.remove('hide', 'show');
  element.style.opacity = '0';
  element.style.display = 'block';
  
  requestAnimationFrame(() => {
    element.classList.add('show');
  });
  
  if (playAudio) {
    playSound();
  }
}

// 공통 함수: inprogress 이미지 즉시 변경
function updateInprogressImage(newSrc) {
  const inprogressImg = document.querySelector('.inprogress-img');
  if (inprogressImg) {
    inprogressImg.src = newSrc;
    inprogressImg.style.display = 'block';
  }
}

// 공통 함수: 여러 이미지 동시에 숨기기
function hideMultipleImages(selectors, playAudio = true) {
  const elements = selectors.map(selector => document.querySelector(selector));
  
  if (playAudio) {
    playSound();
  }
  
  elements.forEach(element => {
    if (element) {
      element.classList.remove('show');
      element.classList.add('hide');
      setTimeout(() => {
        element.style.display = 'none';
      }, 600);
    }
  });
}

// 공통 함수: 이미지 숨기고 나타내기 애니메이션
function hideAndShowImage(element, newSrc, delay = 2000, playSound = true) {
  // 숨기기 애니메이션
  element.classList.remove('show');
  element.classList.add('hide');
  
  // 첫 번째 효과음 재생
  if (playSound) {
    const audio1 = new Audio('assets/sound/mission.mp3');
    audio1.play().catch(error => {
      console.error('효과음 재생 오류:', error);
    });
  }
  
  // 애니메이션 완료 후 display none 처리
  setTimeout(() => {
    element.style.display = 'none';
  }, 600);
  
  // delay 후 새 이미지 표시
  setTimeout(() => {
    // 이미지 소스 변경
    element.src = newSrc;
    
    // 클래스 리셋
    element.classList.remove('hide', 'show');
    
    // opacity 초기화
    element.style.opacity = '0';
    
    // display 설정
    element.style.display = 'block';
    
    // 애니메이션 클래스 추가
    requestAnimationFrame(() => {
      element.classList.add('show');
    });
    
    // 두 번째 효과음 재생
    if (playSound) {
      const audio2 = new Audio('assets/sound/mission.mp3');
      audio2.play().catch(error => {
        console.error('효과음 재생 오류:', error);
      });
    }
  }, delay);
}

// 공통 함수: location 이미지 덮어쓰기 애니메이션
function updateLocationImage(newSrc) {
  const locationCurrent = document.querySelector('.location-current');
  const locationNext = document.querySelector('.location-next');
  
  // 다음 이미지 설정
  locationNext.src = newSrc;
  locationNext.style.opacity = '0';
  locationNext.style.display = 'block';
  locationNext.classList.remove('show');
  
  // 페이드인 애니메이션
  requestAnimationFrame(() => {
    locationNext.classList.add('show');
  });
  
  // 애니메이션 완료 후 current 업데이트
  setTimeout(() => {
    locationCurrent.style.display = 'block';
    locationCurrent.src = newSrc;
    locationNext.style.display = 'none';
    locationNext.classList.remove('show');
    locationNext.style.opacity = '0';
  }, 800);
}

// 초기화
window.onload = function() {
  // ESC 키로 설정 모달 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('configModal').style.display === 'flex') {
      closeConfig();
    }
  });

  // 새로고침 터치 영역 초기화
  initRefreshTouchArea();
  // dm 터치 영역 초기화
  initDMTouchArea();
};


// 개발자 콘솔용 헬퍼 함수들
window.resetScreen = function() {
  // 배경 이미지를 시작 화면으로 되돌림
  const bgImage = document.getElementById('backgroundImage');
  bgImage.src = 'assets/phone-img/page-start.png';
  
  // UI 요소들 숨김
  document.querySelector('.timer-overlay').style.display = 'none';
  document.querySelector('.memo-img').style.display = 'none';
  document.querySelector('.hint-img').style.display = 'none';
  document.querySelector('.sns-img').style.display = 'none';
  
  // 미션 정보 이미지들 숨김 및 원본으로 리셋
  const missionImg = document.querySelector('.mission-img');
  const detailsImg = document.querySelector('.details-img');
  const locationCurrent = document.querySelector('.location-current');
  const locationNext = document.querySelector('.location-next');
  const inprogressImg = document.querySelector('.inprogress-img');
  
  missionImg.style.display = 'none';
  missionImg.src = 'assets/phone-img/mission1.png';
  missionImg.classList.remove('show', 'hide');
  
  detailsImg.style.display = 'none';
  detailsImg.src = 'assets/phone-img/details1.png';
  detailsImg.classList.remove('show', 'hide');
  
  locationCurrent.style.display = 'none';
  locationCurrent.src = 'assets/phone-img/location1.png';
  locationCurrent.classList.remove('show', 'hide');
  locationCurrent.style.opacity = '1';
  
  locationNext.style.display = 'none';
  locationNext.style.opacity = '0';
  locationNext.classList.remove('show');
  locationNext.src = '';
  
  inprogressImg.style.display = 'none';
  inprogressImg.src = 'assets/phone-img/inprogress1.png';
  inprogressImg.classList.remove('show');
  
  // 타이머 리셋
  if (timerInterval) clearInterval(timerInterval);
  timeRemaining = 6000;
  endTime = null; // 종료 시간도 리셋
  const timerOverlay = document.querySelector('.timer-overlay');
  if (timerOverlay) {
    timerOverlay.classList.remove('timeout');
  }
  updateTimerDisplay();
  
  // 핀 진행 상태 리셋
  pinProgress = {
    streetmegaPin22: false,
    safehousePin23: false,
    safehousePin25: false,
    safehousePin27: false,
    disinfectPin23: false,
    streetmegaPin23: false,
    streetmegaPin24: false,
    barPin23: false,
    barPin26: false,
    barPin31: false,
    streetmegaPin23_2nd: false,
    disinfectPin34: false,
    safehousePin24: false,
    safehousePin28: false,
    safehousePin24_2nd: false,
    safehousePin30: false,
    streetmegaPin23_3rd: false,
    doctorPin27: false,
    doctorPin24: false,
    doctorPin26: false,
    streetmegaPin26: false,

    // cctv 업적
    streetmegaPin28: false,
    streetmegaPin29: false,
    streetmegaPin30: false,
    streetmegaPin31: false,
    streetmegaPin32: false,
    // collector 업적
    streetmegaPin33: false,
    // lie 업적
    streetmegaPin34: false,
    // last 업적
    streetmegaPin35: false,
    // follow 업적
    streetmegaPin36: false,
    // wedding 업적
    streetmegaPin37: false,
    // name 업적
    streetmegaPin38: false,
    // pocket 업적
    streetmegaPin40: false,
    // roch 업적
    streetmegaPin42: false,
  };
  
  console.log('화면 및 핀 진행 상태 리셋 완료');
};

// mission/details 이미지 숨기기 (pin23)
function updateToVersion1() {
  console.log('mission/details 이미지 숨기기...');
  
  const missionImg = document.querySelector('.mission-img');
  const detailsImg = document.querySelector('.details-img');
  
  // 숨기기 애니메이션 클래스 추가
  missionImg.classList.remove('show');
  missionImg.classList.add('hide');
  detailsImg.classList.remove('show');
  detailsImg.classList.add('hide');
  
  // 애니메이션 완료 후 display none 처리
  setTimeout(() => {
    missionImg.style.display = 'none';
    detailsImg.style.display = 'none';
  }, 600);
  
  // mission 효과음 재생
  playSound();
  
  console.log('mission/details 이미지 숨김 완료');
}

// 버전 2로 업데이트 (pin25)
function updateToVersion2() {
  console.log('버전 2로 업데이트 중...');
  
  const missionImg = document.querySelector('.mission-img');
  const detailsImg = document.querySelector('.details-img');
  const inprogressImg = document.querySelector('.inprogress-img');
  
  // location 이미지 전환 처리
  const locationCurrent = document.querySelector('.location-current');
  const locationNext = document.querySelector('.location-next');
  
  // 다음 이미지 설정
  locationNext.src = 'assets/phone-img/location2.png';
  locationNext.style.opacity = '0';
  locationNext.style.display = 'block';
  locationNext.classList.remove('show');
  
  // 페이드인 애니메이션
  requestAnimationFrame(() => {
    locationNext.classList.add('show');
  });
  
  // 애니메이션 완료 후 current 업데이트
  setTimeout(() => {
    locationCurrent.src = 'assets/phone-img/location2.png';
    locationNext.style.display = 'none';
    locationNext.classList.remove('show');
    locationNext.style.opacity = '0';
  }, 800);
  
  // inprogress 즉시 변경
  inprogressImg.src = 'assets/phone-img/inprogress2.png';
  
  // mission, details는 새로 나타나는 방식
  missionImg.src = 'assets/phone-img/mission2.png';
  detailsImg.src = 'assets/phone-img/details2.png';
  
  // mission, details 클래스 리셋 및 애니메이션
  missionImg.classList.remove('hide', 'show');
  detailsImg.classList.remove('hide', 'show');
  
  // opacity 초기화
  missionImg.style.opacity = '0';
  detailsImg.style.opacity = '0';
  
  // display 설정
  missionImg.style.display = 'block';
  detailsImg.style.display = 'block';
  
  // 애니메이션 클래스 추가
  requestAnimationFrame(() => {
    missionImg.classList.add('show');
    detailsImg.classList.add('show');
  });
  
  // mission 효과음 재생
  playSound();
  
  console.log('버전 2 업데이트 완료');
}

// 버전 3으로 업데이트 (pin27)
function updateToVersion3() {
  console.log('버전 3으로 업데이트 중...');
  
  const missionImg = document.querySelector('.mission-img');
  const detailsImg = document.querySelector('.details-img');
  const inprogressImg = document.querySelector('.inprogress-img');
  
  // 먼저 mission/details 숨기기 애니메이션
  missionImg.classList.remove('show');
  missionImg.classList.add('hide');
  detailsImg.classList.remove('show');
  detailsImg.classList.add('hide');
  
  // 첫 번째 효과음 재생
  const audio1 = new Audio('assets/sound/mission.mp3');
  audio1.play().catch(error => {
    console.error('효과음 재생 오류:', error);
  });
  
  // 애니메이션 완료 후 display none 처리
  setTimeout(() => {
    missionImg.style.display = 'none';
    detailsImg.style.display = 'none';
  }, 600);
  
  // 2초 후 버전 3 이미지 표시
  setTimeout(() => {
    // location 이미지 전환 처리
    const locationCurrent = document.querySelector('.location-current');
    const locationNext = document.querySelector('.location-next');
    
    // 다음 이미지 설정
    locationNext.src = 'assets/phone-img/location3.png';
    locationNext.style.opacity = '0';
    locationNext.style.display = 'block';
    locationNext.classList.remove('show');
    
    // 페이드인 애니메이션
    requestAnimationFrame(() => {
      locationNext.classList.add('show');
    });
    
    // 애니메이션 완료 후 current 업데이트
    setTimeout(() => {
      locationCurrent.src = 'assets/phone-img/location3.png';
      locationNext.style.display = 'none';
      locationNext.classList.remove('show');
      locationNext.style.opacity = '0';
    }, 800);
    
    // inprogress 즉시 변경
    inprogressImg.src = 'assets/phone-img/inprogress3.png';
    
    // mission, details는 새로 나타나는 방식
    missionImg.src = 'assets/phone-img/mission3.png';
    detailsImg.src = 'assets/phone-img/details3-1.png';
    
    // 클래스 리셋
    missionImg.classList.remove('hide', 'show');
    detailsImg.classList.remove('hide', 'show');
    
    // opacity 초기화
    missionImg.style.opacity = '0';
    detailsImg.style.opacity = '0';
    
    // display 설정
    missionImg.style.display = 'block';
    detailsImg.style.display = 'block';
    
    // 애니메이션 클래스 추가
    requestAnimationFrame(() => {
      missionImg.classList.add('show');
      detailsImg.classList.add('show');
    });
    
    // 두 번째 효과음 재생
    const audio2 = new Audio('assets/sound/mission.mp3');
    audio2.play().catch(error => {
      console.error('효과음 재생 오류:', error);
    });
    
    console.log('버전 3 업데이트 완료');
  }, 2000);
}

// details3-2로 업데이트 (disinfectmega pin23)
function updateDetailsToVersion3_2() {
  console.log('details3-2로 업데이트 중...');
  
  const detailsImg = document.querySelector('.details-img');
  hideAndShowImage(detailsImg, 'assets/phone-img/details3-2.png');
  
  console.log('details3-2 업데이트 완료');
}

// 버전 4로 업데이트 (streetmega pin23)
function updateToVersion4() {
  console.log('버전 4로 업데이트 중...');
  
  const missionImg = document.querySelector('.mission-img');
  const detailsImg = document.querySelector('.details-img');
  const inprogressImg = document.querySelector('.inprogress-img');
  
  // 먼저 mission/details 숨기기 애니메이션
  missionImg.classList.remove('show');
  missionImg.classList.add('hide');
  detailsImg.classList.remove('show');
  detailsImg.classList.add('hide');
  
  // 첫 번째 효과음 재생
  const audio1 = new Audio('assets/sound/mission.mp3');
  audio1.play().catch(error => {
    console.error('효과음 재생 오류:', error);
  });
  
  // 애니메이션 완료 후 display none 처리
  setTimeout(() => {
    missionImg.style.display = 'none';
    detailsImg.style.display = 'none';
  }, 600);
  
  // 2초 후 버전 4 이미지 표시
  setTimeout(() => {
    // location 이미지 전환 처리
    const locationCurrent = document.querySelector('.location-current');
    const locationNext = document.querySelector('.location-next');
    
    // 다음 이미지 설정
    locationNext.src = 'assets/phone-img/location4-2.png';
    locationNext.style.opacity = '0';
    locationNext.style.display = 'block';
    locationNext.classList.remove('show');
    
    // 페이드인 애니메이션
    requestAnimationFrame(() => {
      locationNext.classList.add('show');
    });
    
    // 애니메이션 완료 후 current 업데이트
    setTimeout(() => {
      locationCurrent.src = 'assets/phone-img/location4-2.png';
      locationNext.style.display = 'none';
      locationNext.classList.remove('show');
      locationNext.style.opacity = '0';
    }, 800);
    
    // inprogress 즉시 변경
    inprogressImg.src = 'assets/phone-img/inprogress4.png';
    
    // mission, details는 새로 나타나는 방식
    missionImg.src = 'assets/phone-img/mission4.png';
    detailsImg.src = 'assets/phone-img/details4-1.png';
    
    // 클래스 리셋
    missionImg.classList.remove('hide', 'show');
    detailsImg.classList.remove('hide', 'show');
    
    // opacity 초기화
    missionImg.style.opacity = '0';
    detailsImg.style.opacity = '0';
    
    // display 설정
    missionImg.style.display = 'block';
    detailsImg.style.display = 'block';
    
    // 애니메이션 클래스 추가
    requestAnimationFrame(() => {
      missionImg.classList.add('show');
      detailsImg.classList.add('show');
    });
    
    // 두 번째 효과음 재생
    const audio2 = new Audio('assets/sound/mission.mp3');
    audio2.play().catch(error => {
      console.error('효과음 재생 오류:', error);
    });
    
    console.log('버전 4 업데이트 완료');
  }, 2000);
}

// details4-2로 업데이트 (streetmega pin24)
function updateDetailsToVersion4_2() {
  console.log('details4-2로 업데이트 중...');
  
  const detailsImg = document.querySelector('.details-img');
  hideAndShowImage(detailsImg, 'assets/phone-img/details4-2.png');
  
  console.log('details4-2 업데이트 완료');
}

// location4-3과 details4-3으로 업데이트 (BAR pin23)
function updateToVersion4_3() {
  console.log('버전 4-3으로 업데이트 중...');
  
  const detailsImg = document.querySelector('.details-img');
  
  // details 숨기기만 먼저 처리
  detailsImg.classList.remove('show');
  detailsImg.classList.add('hide');
  
  // 첫 번째 효과음 재생
  const audio1 = new Audio('assets/sound/mission.mp3');
  audio1.play().catch(error => {
    console.error('효과음 재생 오류:', error);
  });
  
  // 애니메이션 완료 후 display none 처리
  setTimeout(() => {
    detailsImg.style.display = 'none';
  }, 600);
  
  // 2초 후 details4-3 표시 및 location4-3 덮어쓰기
  setTimeout(() => {
    // location 이미지 전환
    updateLocationImage('assets/phone-img/location4-3.png');
    
    // details4-3 표시
    detailsImg.src = 'assets/phone-img/details4-3.png';
    detailsImg.classList.remove('hide', 'show');
    detailsImg.style.opacity = '0';
    detailsImg.style.display = 'block';
    
    requestAnimationFrame(() => {
      detailsImg.classList.add('show');
    });
    
    // 두 번째 효과음 재생
    const audio2 = new Audio('assets/sound/mission.mp3');
    audio2.play().catch(error => {
      console.error('효과음 재생 오류:', error);
    });
    
    console.log('버전 4-3 업데이트 완료');
  }, 2000);
}

// mission과 detail 지우기 (BAR pin26)
function clearMissionAndDetails() {
  console.log('mission과 detail 지우기...');
  hideMultipleImages(['.mission-img', '.details-img']);
  console.log('mission과 detail 지움 완료');
}

// 버전 6으로 업데이트 (SLOTmain pin36 또는 pin37)
function updateToVersion6() {
  console.log('버전 6으로 업데이트 중...');
  
  // 20초 후 버전 6 표시
  setTimeout(() => {
    const missionImg = document.querySelector('.mission-img');
    const detailsImg = document.querySelector('.details-img');
    
    // location6-1로 덮어쓰기
    updateLocationImage('assets/phone-img/location6-1.png');
    
    // inprogress6으로 변경
    updateInprogressImage('assets/phone-img/inprogress5.png');
    
    // mission6과 details6-1 표시 (효과음은 한번만)
    showImage(missionImg, 'assets/phone-img/mission6.png');
    showImage(detailsImg, 'assets/phone-img/details6-1.png', false); // 두번째는 효과음 끄기
    
    console.log('버전 6 업데이트 완료');
  }, 20000);
}

// details6-2와 location6-2로 업데이트 (streetmega pin23 두번째)
function updateDetailsToVersion6_2() {
  console.log('details6-2와 location6-2로 업데이트 중...');
  
  const detailsImg = document.querySelector('.details-img');
  
  // detail 지우기 (효과음 포함)
  hideImage(detailsImg);
  
  // 2초 후 details6-2와 location6-2 표시
  setTimeout(() => {
    // location6-2로 덮어쓰기
    updateLocationImage('assets/phone-img/location6-2.png');
    
    // details6-2 표시 (효과음 포함)
    showImage(detailsImg, 'assets/phone-img/details6-2.png');
    
    console.log('details6-2와 location6-2 업데이트 완료');
  }, 2000);
}

// details6-3과 location6-3으로 업데이트 (disinfectmega pin34)
function updateDetailsToVersion6_3() {
  console.log('details6-3과 location6-3으로 업데이트 중...');
  
  const detailsImg = document.querySelector('.details-img');
  
  // detail 지우기 (효과음 포함)
  hideImage(detailsImg);
  
  // 2초 후 details6-3과 location6-3 표시
  setTimeout(() => {
    // location6-3으로 덮어쓰기
    updateLocationImage('assets/phone-img/location6-3.png');
    
    // details6-3 표시 (효과음 포함)
    showImage(detailsImg, 'assets/phone-img/details6-3.png');
    
    console.log('details6-3과 location6-3 업데이트 완료');
  }, 2000);
}

// 버전 7로 업데이트 (safehouse pin24) - 30초 후
function updateToVersion7() {
  console.log('버전 7로 업데이트 중... (30초 후)');
  
  // 미션과 디테일 지우기 (효과음 포함)
  hideMultipleImages(['.mission-img', '.details-img']);
  
  // 30초 후 버전 7 표시
  setTimeout(() => {
    console.log('버전 7 업데이트 실행');
    
    const missionImg = document.querySelector('.mission-img');
    const detailsImg = document.querySelector('.details-img');
    
    // location7로 덮어쓰기
    updateLocationImage('assets/phone-img/location7.png');
    
    // inprogress7로 변경
    updateInprogressImage('assets/phone-img/inprogress6.png');
    
    // mission7과 details7 표시 (효과음은 한번만)
    showImage(missionImg, 'assets/phone-img/mission7.png');
    showImage(detailsImg, 'assets/phone-img/details7.png', false); // 두번째는 효과음 끄기
    
    // SNS 버튼을 activate 상태로 변경
    const snsImg = document.getElementById('sns-button');
    if (snsImg) {
      snsImg.src = 'assets/phone-img/SNS-activate.png';
      isSNSActivated = true;
      console.log('SNS 버튼 활성화됨');
    }
    
    console.log('버전 7 업데이트 완료');
  }, 30000); // 30초 = 30000ms
}

// 버전 8로 업데이트 (safehouse pin28) - 15초 후
function updateToVersion8() {
  console.log('버전 8로 업데이트 중... (15초 후)');
  
  // 미션과 디테일 지우기 (효과음 포함)
  hideMultipleImages(['.mission-img', '.details-img']);
  
  // 15초 후 버전 8 표시
  setTimeout(() => {
    console.log('버전 8 업데이트 실행');
    
    const missionImg = document.querySelector('.mission-img');
    const detailsImg = document.querySelector('.details-img');
    
    // location8로 덮어쓰기
    updateLocationImage('assets/phone-img/location8.png');
    
    // inprogress8로 변경
    updateInprogressImage('assets/phone-img/inprogress7.png');
    
    // mission8과 details8 표시 (효과음은 한번만)
    showImage(missionImg, 'assets/phone-img/mission8.png');
    showImage(detailsImg, 'assets/phone-img/details8.png', false); // 두번째는 효과음 끄기
    
    console.log('버전 8 업데이트 완료');
  }, 15000); // 15초 = 15000ms
}

// 버전 9로 업데이트 (safehouse pin30) - 30초 후
function updateToVersion9() {
  console.log('버전 9로 업데이트 중... (30초 후)');
  
  // 미션과 디테일 지우기 (효과음 포함)
  hideMultipleImages(['.mission-img', '.details-img']);
  
  // 30초 후 버전 9 표시
  setTimeout(() => {
    console.log('버전 9 업데이트 실행');
    
    const missionImg = document.querySelector('.mission-img');
    const detailsImg = document.querySelector('.details-img');
    
    // location9-1로 덮어쓰기
    updateLocationImage('assets/phone-img/location9-1.png');
    
    // inprogress9로 변경
    updateInprogressImage('assets/phone-img/inprogress8.png');
    
    // mission9와 details9-1 표시 (효과음은 한번만)
    showImage(missionImg, 'assets/phone-img/mission9.png');
    showImage(detailsImg, 'assets/phone-img/details9-1.png', false); // 두번째는 효과음 끄기
    
    console.log('버전 9 업데이트 완료');
  }, 30000); // 30초 = 30000ms
}

// details 9-2로 업데이트 (streetmega pin23 세번째 감지)
function updateDetailsToVersion9_2() {
  console.log('details 9-2로 업데이트 중...');
  
  const detailsImg = document.querySelector('.details-img');
  
  // detail 지우기 (효과음 포함)
  hideImage(detailsImg);
  
  // 2초 후 details9-2 표시
  setTimeout(() => {
    console.log('details9-2 표시');
    
    // details9-2 표시 (효과음 포함)
    showImage(detailsImg, 'assets/phone-img/details9-2.png');
    
    console.log('details9-2 업데이트 완료');
  }, 2000);
}

// 버전 10으로 업데이트 (doctor pin27) - 2초 후
function updateToVersion10() {
  console.log('버전 10으로 업데이트 중... (2초 후)');
  
  // 미션과 디테일 지우기 (효과음 포함)
  hideMultipleImages(['.mission-img', '.details-img']);
  
  // 2초 후 버전 10 표시
  setTimeout(() => {
    console.log('버전 10 업데이트 실행');
    
    const missionImg = document.querySelector('.mission-img');
    const detailsImg = document.querySelector('.details-img');
    
    // location10으로 덮어쓰기
    updateLocationImage('assets/phone-img/location10.png');
    
    // inprogress10으로 변경
    updateInprogressImage('assets/phone-img/inprogress9.png');
    
    // mission10과 details10-1 표시 (효과음은 한번만)
    showImage(missionImg, 'assets/phone-img/mission10.png');
    showImage(detailsImg, 'assets/phone-img/details10-1.png', false); // 두번째는 효과음 끄기
    
    console.log('버전 10 업데이트 완료');
  }, 2000); // 2초 = 2000ms
}

// details 10-2로 업데이트 (doctor pin24)
function updateDetailsToVersion10_2() {
  console.log('details 10-2로 업데이트 중...');
  
  const detailsImg = document.querySelector('.details-img');
  
  // detail 지우기 (효과음 포함)
  hideImage(detailsImg);
  
  // 2초 후 details10-2 표시
  setTimeout(() => {
    console.log('details10-2 표시');
    
    // details10-2 표시 (효과음 포함)
    showImage(detailsImg, 'assets/phone-img/details10-2.png');
    
    console.log('details10-2 업데이트 완료');
  }, 2000);
}

// 버전 11로 업데이트 (doctor pin26) - 10초 후
function updateToVersion11() {
  console.log('버전 11로 업데이트 중... (10초 후)');
  
  // 미션과 디테일 지우기 (효과음 포함)
  hideMultipleImages(['.mission-img', '.details-img']);
  
  // 10초 후 버전 11 표시
  setTimeout(() => {
    console.log('버전 11 업데이트 실행');
    
    const missionImg = document.querySelector('.mission-img');
    const detailsImg = document.querySelector('.details-img');
    
    // location11로 덮어쓰기
    updateLocationImage('assets/phone-img/location11.png');
    
    // inprogress11로 변경
    updateInprogressImage('assets/phone-img/inprogress10.png');
    
    // mission11과 details11 표시 (효과음은 한번만)
    showImage(missionImg, 'assets/phone-img/mission11.png');
    showImage(detailsImg, 'assets/phone-img/details11.png', false); // 두번째는 효과음 끄기
    
    console.log('버전 11 업데이트 완료');
  }, 10000); // 10초 = 10000ms
}

// 새로고침 터치 영역 초기화
function initRefreshTouchArea() {
  const touchArea = document.getElementById('refreshTouchArea');
  if (!touchArea) return;
  
  let tapCount = 0;
  let tapTimer = null;
  
  touchArea.addEventListener('click', () => {
    tapCount++;
    console.log(`터치 횟수: ${tapCount}/10`);
    
    // 이전 타이머가 있으면 취소
    if (tapTimer) {
      clearTimeout(tapTimer);
    }
    
    // 10번 터치되면 새로고침
    if (tapCount >= 10) {
      console.log('10번 터치 완료 - 페이지 새로고침');
      location.reload();
    }
    
    // 2초 내에 추가 터치가 없으면 카운트 리셋
    tapTimer = setTimeout(() => {
      console.log('터치 카운트 리셋');
      tapCount = 0;
    }, 2000);
  });
}
// dm 활성화 영역
function initDMTouchArea() {
  const dmTouchArea = document.getElementById('dmTouchArea');
  if (!dmTouchArea) {
    return;
  }
  
  let tapCount = 0;
  let tapTimer = null;
  
  dmTouchArea.addEventListener('click', () => {
    tapCount++;
    console.log(`[DM 터치] 터치 횟수: ${tapCount}/10`);
    
    // 10번 터치되면 dm 활성화
    if (tapCount >= 10) {
      console.log('10번 터치 완료 - dm 활성화');
      isSNSDMActivated = true;
      const snsDMBtn = document.getElementById('snsDMBtn');
      snsDMBtn.src = 'assets/sns-img/dm_button_new.png';
      const dmContainer = document.getElementById('no-dm');
      dmContainer.style.display = 'none';
      const dmDetail = document.getElementById('dm-detail');
      dmDetail.style.display = 'block';
    }
    
    // 2초 내에 추가 터치가 없으면 카운트 리셋
    tapTimer = setTimeout(() => {
      console.log('터치 카운트 리셋');
      tapCount = 0;
    }, 2000);
  });
}

// 메모 그림판 변수들
let canvas, ctx;
let isDrawing = false;
let currentColor = '#00ff41';
let currentBrushSize = 3;
let canvasInitialized = false;

// 메모 버튼 클릭 시
function showMemo() {
  console.log('메모 그림판 열기');
  const modal = document.getElementById('memoModal');
  if (!modal) {
    console.error('메모 모달을 찾을 수 없습니다');
    return;
  }
  
  // popup 효과음 재생
  const audio = new Audio('assets/sound/popup.mp3');
  audio.play().catch(error => {
    console.error('팝업 효과음 재생 오류:', error);
  });
  
  modal.style.display = 'flex';

  // 캔버스 초기화
  if (!canvas) {
    initCanvas();
  }

  // 모달이 완전히 렌더링된 후 캔버스 크기 조정
  // requestAnimationFrame을 2번 사용하여 확실한 렌더링 보장
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      resizeCanvas();
    });
  });
}

// 메모 모달 닫기
function closeMemo() {
  console.log('메모 그림판 닫기');
  
  // popup 효과음 재생
  const audio = new Audio('assets/sound/popup.mp3');
  audio.play().catch(error => {
    console.error('팝업 효과음 재생 오류:', error);
  });
  
  const modal = document.getElementById('memoModal');
  modal.style.display = 'none';
  
  // 캔버스 내용은 유지됨 (clearCanvas를 호출하지 않음)
}

// 캔버스 초기화
function initCanvas() {
  if (canvasInitialized) {
    return; // 이미 초기화되었으면 중복 실행 방지
  }

  canvas = document.getElementById('drawingCanvas');
  if (!canvas) {
    console.error('drawingCanvas 요소를 찾을 수 없습니다');
    return;
  }

  ctx = canvas.getContext('2d');

  // 기본 색상과 브러시 크기 설정
  currentColor = '#00ff41'; // 초록색으로 설정
  currentBrushSize = 3; // 기본 브러시 크기

  // 마우스 이벤트
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  // 터치 이벤트 (모바일)
  canvas.addEventListener('touchstart', handleTouch);
  canvas.addEventListener('touchmove', handleTouch);
  canvas.addEventListener('touchend', stopDrawing);
  canvas.addEventListener('touchcancel', stopDrawing);

  canvasInitialized = true;
}

// 캔버스 크기 조정
function resizeCanvas() {
  if (!canvas || !ctx) {
    console.error('캔버스가 초기화되지 않았습니다');
    return;
  }

  const rect = canvas.getBoundingClientRect();

  // 캔버스 크기가 유효하지 않으면 리턴
  if (rect.width === 0 || rect.height === 0) {
    console.warn('캔버스 크기가 0입니다. 모달이 완전히 렌더링되지 않았을 수 있습니다.');
    return;
  }

  // 캔버스 크기가 변경되지 않았으면 리턴
  if (canvas.width === rect.width && canvas.height === rect.height) {
    return;
  }

  // 현재 캔버스 내용 저장 (크기가 0보다 큰 경우만)
  let imageData = null;
  if (canvas.width > 0 && canvas.height > 0) {
    try {
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } catch (error) {
      console.warn('캔버스 데이터 저장 실패:', error);
    }
  }

  // 캔버스 크기 변경
  canvas.width = rect.width;
  canvas.height = rect.height;

  // 이전 내용 복원
  if (imageData) {
    try {
      ctx.putImageData(imageData, 0, 0);
    } catch (error) {
      console.warn('캔버스 데이터 복원 실패:', error);
    }
  }
}

// 그리기 시작
function startDrawing(e) {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// 그리기
function draw(e) {
  if (!isDrawing) return;
  
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  ctx.lineWidth = currentBrushSize;
  ctx.strokeStyle = currentColor;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// 그리기 중지
function stopDrawing() {
  if (isDrawing) {
    isDrawing = false;
    ctx.beginPath();
  }
}

// 터치 이벤트 처리
function handleTouch(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                   e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}

// 캔버스 초기화
function clearCanvas() {
  // popup 효과음 재생
  const audio = new Audio('assets/sound/popup.mp3');
  audio.play().catch(error => {
    console.error('팝업 효과음 재생 오류:', error);
  });
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log('캔버스 초기화됨');
}

// 그림 저장
function saveDrawing() {
  const link = document.createElement('a');
  link.download = `memo_${new Date().getTime()}.png`;
  link.href = canvas.toDataURL();
  link.click();
  console.log('그림 저장됨');
}

// 힌트 버튼 클릭 시
function showHint() {
  playSound('assets/sound/popup.mp3'); // 팝업 효과음
  const hintModal = document.getElementById('hintModal');
  const hintInput = document.getElementById('hintCodeInput');
  
  if (hintModal) {
    hintModal.style.display = 'block';
    hintModal.classList.remove('closing');
    // 애니메이션 재실행을 위한 리플로우 강제
    void hintModal.offsetWidth;
    hintModal.style.opacity = '1';
    
    // 입력 필드 초기화 및 포커스
    if (hintInput) {
      hintInput.value = '';
      setTimeout(() => {
        hintInput.focus();
      }, 200); // 애니메이션 후 포커스
      
      // 입력 이벤트 리스너 추가 (대문자 변환 및 공백 제거)
      hintInput.oninput = function(e) {
        const value = e.target.value;
        // 공백 제거하고 대문자로 변환
        e.target.value = value.replace(/\s/g, '').toUpperCase();
      };
    }
    
    // 모달 클릭 시 포커스 해제 (입력 필드 제외)
    hintModal.onclick = function(e) {
      if (e.target !== hintInput) {
        hintInput.blur();
      }
    };
  }
}

// 힌트 팝업 닫기
function closeHint() {
  playSound('assets/sound/popup.mp3'); // 팝업 효과음
  const hintModal = document.getElementById('hintModal');
  const hintInput = document.getElementById('hintCodeInput');
  
  if (hintModal) {
    hintModal.classList.add('closing');
    setTimeout(() => {
      hintModal.style.display = 'none';
      hintModal.classList.remove('closing');
      hintModal.style.opacity = '0';
      
      // exit 버튼을 눌렀을 때만 입력값 초기화
      if (hintInput) {
        hintInput.value = '';
      }
      
      // 모든 요소를 원래 상태로 초기화
      resetHintModal();
    }, 300); // 닫기 애니메이션 시간과 일치
  }
}

// 힌트 모달 초기화
function resetHintModal() {
  // 입력 관련 요소들 다시 표시
  const codeTitle = document.querySelector('.hint-code-title');
  const codeblock = document.querySelector('.hint-codeblock');
  const codeInput = document.getElementById('hintCodeInput');
  const enterBtn = document.querySelector('.hint-enter-btn');
  
  if (codeTitle) codeTitle.style.display = 'block';
  if (codeblock) codeblock.style.display = 'block';
  if (codeInput) {
    codeInput.style.display = 'block';
    // input 값은 exit 버튼을 눌렀을 때만 초기화되므로 여기서는 초기화하지 않음
  }
  if (enterBtn) enterBtn.style.display = 'block';
  
  // 상세 화면 요소들 숨기기
  const detailImg = document.querySelector('.hint-detail-img');
  const backBtn = document.querySelector('.hint-back-btn');
  const nextBtn = document.querySelector('.hint-next-btn');
  
  if (detailImg) {
    detailImg.style.display = 'none';
    detailImg.style.opacity = '0';
    detailImg.src = 'assets/hint-img/hintdetail01.png'; // 원래 이미지로 리셋
  }
  if (backBtn) {
    backBtn.style.display = 'none';
    backBtn.style.opacity = '0';
    backBtn.onclick = showHintInput; // 원래 기능으로 리셋
  }
  if (nextBtn) {
    nextBtn.style.display = 'none';
    nextBtn.style.opacity = '0';
    nextBtn.onclick = showHintSolution; // 원래 기능으로 리셋
  }
}

// 힌트 Enter 버튼 클릭
function hintEnter() {
  const hintInput = document.getElementById('hintCodeInput');
  if (hintInput) {
    const hintCode = hintInput.value.trim();
    if (hintCode) {
      processHintCode(hintCode);
    }
  }
}

// 힌트 코드 처리
function processHintCode(code) {
  const upperCode = code.toUpperCase();
  
  // LC001부터 LC024까지 처리
  if (upperCode.startsWith('LC')) {
    const codeNumber = parseInt(upperCode.substring(2));
    if (codeNumber >= 1 && codeNumber <= 21) {
      playSound('assets/sound/popup.mp3');
      // 코드 번호를 전달하여 해당하는 이미지 표시
      showHintDetail(codeNumber);
    } else {
      console.log('잘못된 힌트 코드입니다.');
    }
  } else {
    console.log('잘못된 힌트 코드입니다.');
  }
}

// 힌트 상세 화면 표시
function showHintDetail(codeNumber) {
  // 입력 관련 요소들 숨기기
  const codeTitle = document.querySelector('.hint-code-title');
  const codeblock = document.querySelector('.hint-codeblock');
  const codeInput = document.getElementById('hintCodeInput');
  const enterBtn = document.querySelector('.hint-enter-btn');
  
  if (codeTitle) codeTitle.style.display = 'none';
  if (codeblock) codeblock.style.display = 'none';
  if (codeInput) codeInput.style.display = 'none';
  if (enterBtn) enterBtn.style.display = 'none';
  
  // 상세 화면 요소들 표시
  const detailImg = document.querySelector('.hint-detail-img');
  const backBtn = document.querySelector('.hint-back-btn');
  const nextBtn = document.querySelector('.hint-next-btn');
  
  if (detailImg) {
    // 코드 번호에 맞는 이미지 설정 (01~24까지 두 자리 형식)
    const formattedNumber = String(codeNumber).padStart(2, '0');
    detailImg.src = `assets/hint-img/hintdetail${formattedNumber}.png`;
    detailImg.style.display = 'block';
    detailImg.style.opacity = '1'; // 바로 표시
    
    // 현재 코드 번호를 데이터 속성에 저장
    detailImg.dataset.codeNumber = codeNumber;
  }
  
  if (backBtn) {
    backBtn.style.display = 'block';
    backBtn.style.opacity = '1'; // 바로 표시
  }
  
  if (nextBtn) {
    nextBtn.style.display = 'block';
    nextBtn.style.opacity = '1'; // 바로 표시
  }
}

// 힌트 입력 화면으로 돌아가기
function showHintInput() {
  playSound('assets/sound/popup.mp3'); // 팝업 효과음
  
  // 상세 화면 요소들 숨기기
  const detailImg = document.querySelector('.hint-detail-img');
  const backBtn = document.querySelector('.hint-back-btn');
  const nextBtn = document.querySelector('.hint-next-btn');
  
  if (detailImg) detailImg.style.display = 'none';
  if (backBtn) backBtn.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';
  
  // 입력 관련 요소들 다시 표시
  const codeTitle = document.querySelector('.hint-code-title');
  const codeblock = document.querySelector('.hint-codeblock');
  const codeInput = document.getElementById('hintCodeInput');
  const enterBtn = document.querySelector('.hint-enter-btn');
  
  if (codeTitle) codeTitle.style.display = 'block';
  if (codeblock) codeblock.style.display = 'block';
  if (codeInput) {
    codeInput.style.display = 'block';
    codeInput.value = '';
    codeInput.focus();
  }
  if (enterBtn) enterBtn.style.display = 'block';
}

// 힌트 솔루션 표시
function showHintSolution() {
  playSound('assets/sound/popup.mp3'); // 팝업 효과음
  
  const detailImg = document.querySelector('.hint-detail-img');
  const nextBtn = document.querySelector('.hint-next-btn');
  const backBtn = document.querySelector('.hint-back-btn');
  
  if (detailImg) {
    // 현재 코드 번호를 가져와서 해당하는 솔루션 이미지로 변경
    const codeNumber = detailImg.dataset.codeNumber || 1;
    const formattedNumber = String(codeNumber).padStart(2, '0');
    detailImg.src = `assets/hint-img/solution${formattedNumber}.png`;
    detailImg.style.opacity = '1';
  }
  
  // next 버튼 숨기기
  if (nextBtn) {
    nextBtn.style.display = 'none';
  }
  
  // back 버튼의 기능을 detail로 돌아가기로 변경
  if (backBtn) {
    backBtn.onclick = showHintDetailFromSolution;
  }
}

// Solution에서 Detail로 돌아가기
function showHintDetailFromSolution() {
  playSound('assets/sound/popup.mp3'); // 팝업 효과음
  
  const detailImg = document.querySelector('.hint-detail-img');
  const nextBtn = document.querySelector('.hint-next-btn');
  const backBtn = document.querySelector('.hint-back-btn');
  
  if (detailImg) {
    // 현재 코드 번호를 유지하여 해당하는 detail 이미지로 변경
    const codeNumber = detailImg.dataset.codeNumber || 1;
    const formattedNumber = String(codeNumber).padStart(2, '0');
    detailImg.src = `assets/hint-img/hintdetail${formattedNumber}.png`;
    detailImg.style.opacity = '1';
  }
  
  // next 버튼 다시 표시
  if (nextBtn) {
    nextBtn.style.display = 'block';
    nextBtn.style.opacity = '1';
  }
  
  // back 버튼의 기능을 원래대로 (입력창으로 가기)
  if (backBtn) {
    backBtn.onclick = showHintInput;
  }
}

// SNS 버튼 클릭 시
function showSNS() {
  // SNS가 활성화되지 않았으면 아무 동작도 하지 않음
  if (!isSNSActivated) {
    console.log('SNS가 아직 활성화되지 않았습니다.');
    return;
  }

  // SNS 모달 열기
  const snsModal = document.getElementById('snsModal');
  if (snsModal) {
    playSound('assets/sound/popup.mp3');
    snsModal.style.display = 'flex';
    snsModal.style.opacity = '1';
    const snsDot = document.getElementById('snsDot');
    snsDot.style.display = 'none';
  }
}

// SNS 모달 닫기
function closeSNS() {
  const snsModal = document.getElementById('snsModal');
  if (snsModal) {
    playSound('assets/sound/popup.mp3');
    snsModal.style.display = 'none';
    console.log('SNS 모달 닫힘');
  }
}

function clickSearch() {
  const snsSearchBtn = document.getElementById('snsSearchBtn');
  const snsPeopleBtn = document.getElementById('snsPeopleBtn');
  const snsDMBtn = document.getElementById('snsDMBtn');
  snsSearchBtn.src = 'assets/sns-img/find_button_click.png';
  snsPeopleBtn.src = 'assets/sns-img/people_button.png';
  if(isSNSDMActivated){
    snsDMBtn.src = 'assets/sns-img/dm_button_new.png';
  } else {
    snsDMBtn.src = 'assets/sns-img/dm_button.png';
  }

  const profile1 = document.getElementById('profile1');
  const thumbnailContainer = document.querySelector('.thumbnail-container');
  profile1.style.display = 'none';
  thumbnailContainer.style.display = 'none';

  const picDetailContainer = document.querySelector('.pic-detail-container');
  picDetailContainer.style.display = 'none';

  const searchContainer = document.getElementById('search-container');
  searchContainer.style.display = 'block';
  const searchResultContainer = document.getElementById('search-result-container');
  searchResultContainer.style.display = 'none';
  const searchResultContainer2 = document.getElementById('search-result-container2');
  searchResultContainer2.style.display = 'none';

  const dmContainer = document.getElementById('dm-container');
  dmContainer.style.display = 'none';
}

function clickPeople() {
  const snsSearchBtn = document.getElementById('snsSearchBtn');
  const snsPeopleBtn = document.getElementById('snsPeopleBtn');
  const snsDMBtn = document.getElementById('snsDMBtn');
  snsSearchBtn.src = 'assets/sns-img/find_button.png';
  snsPeopleBtn.src = 'assets/sns-img/people_button_click.png';
  if(isSNSDMActivated){
    snsDMBtn.src = 'assets/sns-img/dm_button_new.png';
  } else {
    snsDMBtn.src = 'assets/sns-img/dm_button.png';
  }

  const profile1 = document.getElementById('profile1');
  const thumbnailContainer = document.querySelector('.thumbnail-container');
  profile1.style.display = 'block';
  thumbnailContainer.style.display = 'block';

  const picDetailContainer = document.querySelector('.pic-detail-container');
  picDetailContainer.style.display = 'none';

  const picDetailPrevBtn = document.getElementById('pic-detail-prev-btn');
  picDetailPrevBtn.style.display = 'none';
  const picDetailNextBtn = document.getElementById('pic-detail-next-btn');
  picDetailNextBtn.style.display = 'block';

  const searchContainer = document.getElementById('search-container');
  searchContainer.style.display = 'none';
  const searchResultContainer = document.getElementById('search-result-container');
  searchResultContainer.style.display = 'none';
  const searchResultContainer2 = document.getElementById('search-result-container2');
  searchResultContainer2.style.display = 'none';

  const dmContainer = document.getElementById('dm-container');
  dmContainer.style.display = 'none';
}

function clickDM() {
  const snsSearchBtn = document.getElementById('snsSearchBtn');
  const snsPeopleBtn = document.getElementById('snsPeopleBtn');
  const snsDMBtn = document.getElementById('snsDMBtn');
  snsSearchBtn.src = 'assets/sns-img/find_button.png';
  snsPeopleBtn.src = 'assets/sns-img/people_button.png';
  snsDMBtn.src = 'assets/sns-img/dm_button_click.png';
  isSNSDMActivated = false;

  const profile1 = document.getElementById('profile1');
  const thumbnailContainer = document.querySelector('.thumbnail-container');
  profile1.style.display = 'none';
  thumbnailContainer.style.display = 'none';

  const picDetailContainer = document.querySelector('.pic-detail-container');
  picDetailContainer.style.display = 'none';

  const searchContainer = document.getElementById('search-container');
  searchContainer.style.display = 'none';
  const searchResultContainer = document.getElementById('search-result-container');
  searchResultContainer.style.display = 'none';
  const searchResultContainer2 = document.getElementById('search-result-container2');
  searchResultContainer2.style.display = 'none';

  const dmContainer = document.getElementById('dm-container');
  dmContainer.style.display = 'flex';
}

function clickFollow() {
  const follow = document.getElementById('follow');
  follow.src = 'assets/sns-img/follow_check.png';
}

function clickPic1() {
  const profile1 = document.getElementById('profile1');
  const thumbnailContainer = document.querySelector('.thumbnail-container');
  profile1.style.display = 'none';
  thumbnailContainer.style.display = 'none';

  const picDetailContainer = document.querySelector('.pic-detail-container');
  picDetailContainer.style.display = 'block';
  const picDetail = document.getElementById('pic-detail');
  picDetail.src = 'assets/sns-img/pic1_detail1.png';
}

function clickPic2() {
  const profile1 = document.getElementById('profile1');
  const thumbnailContainer = document.querySelector('.thumbnail-container');
  profile1.style.display = 'none';
  thumbnailContainer.style.display = 'none';

  const picDetailContainer = document.querySelector('.pic-detail-container');
  picDetailContainer.style.display = 'block';
  const picDetail = document.getElementById('pic-detail');
  picDetail.src = 'assets/sns-img/pic2_detail1.png';
}

function clickPic3() {
  const profile1 = document.getElementById('profile1');
  const thumbnailContainer = document.querySelector('.thumbnail-container');
  profile1.style.display = 'none';
  thumbnailContainer.style.display = 'none';

  const picDetailContainer = document.querySelector('.pic-detail-container');
  picDetailContainer.style.display = 'block';
  const picDetail = document.getElementById('pic-detail');
  picDetail.src = 'assets/sns-img/pic3_detail1.png';
}

function clickPic4() {
  const profile1 = document.getElementById('profile1');
  const thumbnailContainer = document.querySelector('.thumbnail-container');
  profile1.style.display = 'none';
  thumbnailContainer.style.display = 'none';

  const picDetailContainer = document.querySelector('.pic-detail-container');
  picDetailContainer.style.display = 'block';
  const picDetail = document.getElementById('pic-detail');
  picDetail.src = 'assets/sns-img/pic4_detail1.png';
}

function prevPicDetail() {
  const picDetail = document.getElementById('pic-detail');
  picDetail.src = picDetail.src.slice(0, -5) + '1.png';
  const picDetailPrevBtn = document.getElementById('pic-detail-prev-btn');
  picDetailPrevBtn.style.display = 'none';
  const picDetailNextBtn = document.getElementById('pic-detail-next-btn');
  picDetailNextBtn.style.display = 'block';
}

function nextPicDetail() {
  const picDetail = document.getElementById('pic-detail');
  picDetail.src = picDetail.src.slice(0, -5) + '2.png';
  const picDetailPrevBtn = document.getElementById('pic-detail-prev-btn');
  picDetailPrevBtn.style.display = 'block';
  const picDetailNextBtn = document.getElementById('pic-detail-next-btn');
  picDetailNextBtn.style.display = 'none';
}

function backPicDetail() {
  const picDetailContainer = document.querySelector('.pic-detail-container');
  picDetailContainer.style.display = 'none';

  const profile1 = document.getElementById('profile1');
  const thumbnailContainer = document.querySelector('.thumbnail-container');
  profile1.style.display = 'block';
  thumbnailContainer.style.display = 'block';

  const picDetailPrevBtn = document.getElementById('pic-detail-prev-btn');
  picDetailPrevBtn.style.display = 'none';
  const picDetailNextBtn = document.getElementById('pic-detail-next-btn');
  picDetailNextBtn.style.display = 'block';
}

// search-input 에서 Enter 키 입력 시
function searchEnter(event) {
  if (event.key === 'Enter' || event.keyCode === 13) {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.trim();
    
    if (!searchValue) {
        document.getElementById('search-no-result').style.display = 'none';
        document.getElementById('search-result-row').style.display = 'none';
        return;
    }
    
    if (searchValue.toLowerCase() === '@anders.roch' || searchValue.toLowerCase() === 'anders.roch') {
        document.getElementById('search-no-result').style.display = 'none';
        document.getElementById('search-result-row').style.display = 'flex';
        document.getElementById('search-result-row2').style.display = 'none';
    } else if (searchValue.toLowerCase() === '@fantastrick' || searchValue.toLowerCase() === 'fantastrick') {
        document.getElementById('search-no-result').style.display = 'none';
        document.getElementById('search-result-row2').style.display = 'flex';
        document.getElementById('search-result-row').style.display = 'none';
    } else {
        document.getElementById('search-no-result').style.display = 'flex';
        document.getElementById('search-result-row').style.display = 'none';
        document.getElementById('search-result-row2').style.display = 'none';
    }
    searchInput.value = '';
  }
}

function clickSearchResult() {
  const searchContainer = document.getElementById('search-container');
  searchContainer.style.display = 'none';
  const searchResultContainer = document.getElementById('search-result-container');
  searchResultContainer.style.display = 'flex';
}

function clickSearchResult2() {
  const searchContainer = document.getElementById('search-container');
  searchContainer.style.display = 'none';
  const searchResultContainer = document.getElementById('search-result-container2');
  searchResultContainer.style.display = 'flex';
}

function showQuest() {
  playSound('assets/sound/popup.mp3'); // 팝업 효과음
  const questModal = document.getElementById('questModal');
  questModal.style.display = 'block';
}

// 토스트 팝업 표시 함수
function showQuestToast(questName) {
  playSound('assets/sound/ding.ogg'); // 팝업 효과음
  const toast = document.getElementById('questToast');
  const toastText = toast.querySelector('.quest-toast-text');

  // 텍스트 설정
  toastText.textContent = `도전 과제 달성: ${questName}`;

  // 토스트 표시
  toast.classList.add('show');

  // 3초 후 자동으로 사라짐
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function closeQuest() {
  playSound('assets/sound/popup.mp3'); // 팝업 효과음
  const questModal = document.getElementById('questModal');
  
  if (questModal) {
    questModal.classList.add('closing');
    setTimeout(() => {
      questModal.style.display = 'none';
      questModal.classList.remove('closing');
    }, 200); // 닫기 애니메이션 시간과 일치
  }
}

// window 객체에 함수 등록 (onclick에서 접근 가능하도록)
window.showMemo = showMemo;
window.closeMemo = closeMemo;
window.clearCanvas = clearCanvas;
window.saveDrawing = saveDrawing;
window.showHint = showHint;
window.closeHint = closeHint;
window.hintEnter = hintEnter;
window.showHintInput = showHintInput;
window.showHintSolution = showHintSolution;
window.showHintDetailFromSolution = showHintDetailFromSolution;
window.showSNS = showSNS;

// 엔딩 화면 표시 (streetmega pin26)
function showEndingScreen() {
  console.log('엔딩 화면으로 전환');
  
  // 타이머 정지
  if (timerInterval) {
    clearInterval(timerInterval);
    console.log('타이머 정지됨');
  }
  
  // 배경 이미지를 page-end.png로 변경
  const bgImage = document.getElementById('backgroundImage');
  bgImage.src = 'assets/phone-img/page-end.png';
  
  // 모든 버튼 숨기기 (display와 visibility 모두 처리)
  const memoImg = document.querySelector('.memo-img');
  const hintImg = document.querySelector('.hint-img');
  const snsImg = document.querySelector('.sns-img');
  
  if (memoImg) {
    memoImg.style.display = 'none';
    memoImg.style.visibility = 'hidden';
  }
  if (hintImg) {
    hintImg.style.display = 'none';
    hintImg.style.visibility = 'hidden';
  }
  if (snsImg) {
    snsImg.style.display = 'none';
    snsImg.style.visibility = 'hidden';
  }
  
  // 모든 미션 관련 이미지 숨기기 (display와 visibility 모두 처리)
  const missionImg = document.querySelector('.mission-img');
  const detailsImg = document.querySelector('.details-img');
  const locationCurrent = document.querySelector('.location-current');
  const locationNext = document.querySelector('.location-next');
  const inprogressImg = document.querySelector('.inprogress-img');
  
  if (missionImg) {
    missionImg.style.display = 'none';
    missionImg.style.visibility = 'hidden';
    missionImg.classList.remove('show', 'hide');
  }
  if (detailsImg) {
    detailsImg.style.display = 'none';
    detailsImg.style.visibility = 'hidden';
    detailsImg.classList.remove('show', 'hide');
  }
  if (locationCurrent) {
    locationCurrent.style.display = 'none';
    locationCurrent.style.visibility = 'hidden';
    locationCurrent.classList.remove('show', 'hide');
  }
  if (locationNext) {
    locationNext.style.display = 'none';
    locationNext.style.visibility = 'hidden';
    locationNext.classList.remove('show');
  }
  if (inprogressImg) {
    inprogressImg.style.display = 'none';
    inprogressImg.style.visibility = 'hidden';
    inprogressImg.classList.remove('show');
  }

  // hintModal 숨기기
  const hintModal = document.getElementById('hintModal');
  if (hintModal) {
    hintModal.style.display = 'none';
  }
  
  // 타이머는 계속 표시 (멈춘 상태로) - ending 클래스 추가
  const timerOverlay = document.querySelector('.timer-overlay');
  if (timerOverlay) {
    timerOverlay.style.display = 'block';
    timerOverlay.classList.remove('timeout');
    timerOverlay.classList.add('ending');
  }
  
}