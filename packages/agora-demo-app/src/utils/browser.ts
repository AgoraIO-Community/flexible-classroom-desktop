import { LanguageEnum } from 'agora-classroom-sdk';
import { Platform } from 'agora-edu-core';

export function checkBrowserDevice(): Platform {
  const sUserAgent = navigator.userAgent.toLowerCase();
  // const bIsIpad = sUserAgent.match(/ipad/i);
  const bIsIphoneOs = sUserAgent.match(/iphone os/i);
  const bIsMidp = sUserAgent.match(/midp/i);
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i);
  const bIsUc = sUserAgent.match(/ucweb/i);
  const bIsAndroid = sUserAgent.match(/android/i);
  const bIsCE = sUserAgent.match(/windows ce/i);
  const bIsWM = sUserAgent.match(/windows mobile/i);
  if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return Platform.H5;
  }
  return Platform.PC;
}

export function isH5Browser() {
  return Platform.H5 === checkBrowserDevice();
}

export const getBrowserLanguage = (): LanguageEnum => {
  const usrlang = navigator.language;
  if (usrlang.startsWith('zh')) {
    return 'zh';
  }
  return 'en';
};
