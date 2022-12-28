import { EduRegion } from 'agora-edu-core';
import { AgoraRegion } from 'agora-rte-sdk';
import { REACT_APP_AGORA_APP_TOKEN_DOMAIN, REACT_APP_SCENE_BUILDER_DOMAIN } from './env';

function initApiDomain() {
  let domain = '';
  let domainMap: Record<string, string> = {};
  try {
    domainMap = JSON.parse(`${REACT_APP_AGORA_APP_TOKEN_DOMAIN}`);
  } catch (e) {
    domain = `${REACT_APP_AGORA_APP_TOKEN_DOMAIN}`;
  }
  return {
    domain,
    domainMap,
  };
}

const apiDomain = initApiDomain();

export const getApiDomain = (region: EduRegion = EduRegion.CN) => {
  let domain = apiDomain.domain;
  const { domainMap } = apiDomain;
  if (!domain && domainMap) {
    switch (region) {
      case AgoraRegion.CN:
        domain = domainMap['prod_cn'];
        break;
      case AgoraRegion.NA:
        domain = domainMap['prod_na'];
        break;
      case AgoraRegion.EU:
        domain = domainMap['prod_eu'];
        break;
      case AgoraRegion.AP:
        domain = domainMap['prod_ap'];
        break;
      default:
        domain = domainMap['prod_na'];
    }
  }
  return domain;
};

function initAppDomain() {
  let domain = '';
  let domainMap: Record<string, string> = {};
  try {
    domainMap = JSON.parse(`${REACT_APP_SCENE_BUILDER_DOMAIN}`);
  } catch (e) {
    domain = `${REACT_APP_SCENE_BUILDER_DOMAIN}`;
  }
  return {
    domain,
    domainMap,
  };
}

const appDomain = initAppDomain();

export const getAppDomain = (region: EduRegion = EduRegion.CN) => {
  let domain = appDomain.domain;
  const { domainMap } = apiDomain;
  if (!domain && domainMap) {
    switch (region) {
      case AgoraRegion.CN:
        domain = domainMap['prod_cn'];
        break;
      case AgoraRegion.NA:
        domain = domainMap['prod_na'];
        break;
      default:
        domain = domainMap['prod_na'];
    }
  }
  return domain;
};
