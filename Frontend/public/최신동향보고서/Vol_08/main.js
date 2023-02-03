// 엄격한 자바스크립트 룰 적용
'use strict';

// 토스트 모듈 기본 주소
// Toast.config.moduleBaseUrl = './'
// 토스트 데이타 기본 주소
// Toast.config.dataBaseUrl = './'

// require 환경설정
require.config({
  // 모듈 경로
  paths: {
    text: Toast.config.moduleBaseUrl + 'thirdparty/text',
    i18n: Toast.config.moduleBaseUrl + 'thirdparty/i18n',
    toast: Toast.config.moduleBaseUrl + 'toast/toast'
  },
  
  // XMLHttpRequrest 사용여부
  useXhr: false,

  // 스크립트 로딩 타임아웃 시간 설정
  waitSeconds: 30
});

 // 토스트 모듈 로드
define(['toast'], function (Toast) {
  // 토스트 시작
  Toast.start();
});
