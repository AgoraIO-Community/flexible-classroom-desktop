export function getLSStore<TStore>(storeLSName: string): null | TStore {
  try {
    const str = localStorage.getItem(storeLSName);
    if (!str) {
      return null;
    }

    const ls = JSON.parse(str);
    // compatible with old version
    if (Array.isArray(ls)) {
      return ls[1];
    }
    return ls;
  } catch (e) {
    return null;
  }
}

export function setLSStore<TStore>(storeLSName: string, store: TStore): void {
  localStorage.setItem(storeLSName, JSON.stringify(store));
}

export function clearLSStore(storeLSName: string) {
  localStorage.removeItem(storeLSName);
}

export const LS_COMPANY_ID = 'company_id';
export const LS_NICK_NAME = 'nick_name';
export const LS_USER_INFO = 'user_info';
export const LS_ACCESS_TOKEN = 'access_token';
export const LS_REFRESH_TOKEN = 'refresh_token';

export const LS_REGION = `region`;
export const LS_THEME = `theme`;
export const LS_LANGUAGE = `language`;
export const LS_LAUNCH = `launch_options`;
export const LS_ORIGIN_LAUNCH = `origin_launch_options`;
