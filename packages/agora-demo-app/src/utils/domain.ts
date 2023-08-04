import type { EduRegion } from 'agora-edu-core';
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

export const getApiDomain = (region = 'CN' as EduRegion) => {
  let domain = apiDomain.domain;
  const { domainMap } = apiDomain;
  if (!domain && domainMap) {
    switch (region) {
      case 'CN':
        domain = domainMap['prod_cn'];
        break;
      case 'NA':
        domain = domainMap['prod_na'];
        break;
      case 'EU':
        domain = domainMap['prod_eu'];
        break;
      case 'AP':
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

export const getAppDomain = (region = 'CN' as EduRegion) => {
  let domain = appDomain.domain;
  const { domainMap } = appDomain;
  if (!domain && domainMap) {
    switch (region) {
      case 'CN':
        domain = domainMap['prod_cn'];
        break;
      case 'NA':
        domain = domainMap['prod_na'];
        break;
      default:
        domain = domainMap['prod_na'];
    }
  }
  return domain;
};
