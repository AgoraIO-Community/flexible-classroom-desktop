export function getLSStore<TStore>(storeLSName: string): null | TStore {
  try {
    const str = localStorage.getItem(storeLSName);
    if (!str) {
      return null;
    }

    return JSON.parse(str);
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
export const LS_LAST_JOINED_ROOM_ID = 'ls_last_joined_room_id';
