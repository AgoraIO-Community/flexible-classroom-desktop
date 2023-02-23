import { EduRegion } from 'agora-edu-core';
import { EduRoleTypeEnum } from 'agora-edu-core';
import { REACT_APP_SHARE_LINK_PREFIX } from './env';

export type ShareContent = {
  roomId: string;
  owner: string;
  region?: EduRegion;
  role: EduRoleTypeEnum;
};

declare const CLASSROOM_SDK_VERSION: string;

/**
 * Share links function
 */
export class ShareLink {
  constructor() {
    const match = CLASSROOM_SDK_VERSION.substring(
      CLASSROOM_SDK_VERSION.lastIndexOf('.') + 1,
    ).substring(0, 1);
    const [major, minor] = CLASSROOM_SDK_VERSION.split('.');
    const version = `${major}.${minor}.${match}x`;
    this._url = `${REACT_APP_SHARE_LINK_PREFIX}/release_${version}/index.html`;
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
