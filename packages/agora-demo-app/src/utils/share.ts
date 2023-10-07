import type { EduRegion, EduRoleTypeEnum } from 'agora-edu-core';
import { isElectron } from 'agora-rte-sdk/lib/core/utils/utils';

export type ShareContent = {
  roomId: string;
  owner: string;
  region?: EduRegion;
  role: EduRoleTypeEnum;
};

/**
 * Share links function
 */
export class ShareLink {
  constructor() {
    this._url = isElectron()
      ? 'https://solutions-apaas.agora.io/apaas/demo/index.html'
      : `${location.origin}${location.pathname}`;
  }

  private _url = '';

  private encode(params: ShareContent) {
    params.owner = encodeURI(params.owner);
    const str = JSON.stringify(params);
    return window.btoa(str);
  }

  private decode(str: string): ShareContent | null {
    try {
      const jsonStr = window.atob(str);
      const data = JSON.parse(jsonStr);
      if (data.owner && data.owner !== '') {
        data.owner = decodeURI(data.owner);
      }
      if (data.region && data.region !== '') {
        data.region = data.region.toUpperCase();
      }
      return data;
    } catch (e) {
      console.warn(`Invalid decode content:%o`, e);
      return null;
    }
  }

  query(params: ShareContent) {
    return `sc=${this.encode(params)}`;
  }

  generateUrl(params: ShareContent, url = this._url) {
    return `${url}#/invite?${this.query(params)}`;
  }

  parseSearch(search: string): ShareContent | null {
    const arr = search.split('?');
    if (arr.length < 2 || !arr[1]) {
      return null;
    }
    const params = new URLSearchParams(arr[1]);
    const sc = params.get('sc');
    if (sc) {
      return this.decode(sc);
    }
    return null;
  }
}

export const shareLink = new ShareLink();
//@ts-ignore
window.__parseSearch = shareLink.parseSearch.bind(shareLink);
