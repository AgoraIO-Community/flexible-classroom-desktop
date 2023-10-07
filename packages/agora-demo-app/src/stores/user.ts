import { action, observable, runInAction } from 'mobx';
import { UserApi, UserInfo } from '../api/user';
import { token } from '../utils';
import {
  clearLSStore,
  getLSStore,
  LS_COMPANY_ID,
  LS_NICK_NAME,
  LS_USER_INFO,
  setLSStore,
} from '../utils/local-storage';
import { sleep } from 'agora-rte-sdk/lib/core/utils/utils';

export class UserStore {
  @observable
  isLogin = false;

  @observable
  isLoading = false;

  @observable
  userInfo: UserInfo | null = null;

  @observable
  nickName = '';

  constructor() {
    runInAction(() => {
      this.userInfo = getLSStore<UserInfo>(LS_USER_INFO);
      this.nickName = getLSStore<string>(LS_NICK_NAME) || this.userInfo?.displayName || '';
    });
  }

  @action.bound
  setLogin(isLogin: boolean) {
    this.isLogin = isLogin;
  }

  @action.bound
  private setUserInfo(data: UserInfo | null) {
    this.userInfo = data;

    if (data) {
      setLSStore(LS_USER_INFO, data ?? null);
      setLSStore(LS_COMPANY_ID, data?.companyId ?? '');
      if (this.userInfo?.displayName) {
        this.setNickName(this.userInfo.displayName);
      } else {
        const rand = `${Math.floor(Math.random() * 9999)}`.padStart(4, '0');
        this.setNickName(`user${rand}`);
      }
    } else {
      clearLSStore(LS_USER_INFO);
      clearLSStore(LS_COMPANY_ID);
      this.setNickName('');
    }
  }
  @action.bound
  private setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  @action.bound
  setNickName(name: string | null) {
    if (name !== null) {
      setLSStore(LS_NICK_NAME, this.nickName);
      this.nickName = name;
    } else {
      clearLSStore(LS_NICK_NAME);
      this.nickName = '';
    }
  }

  @action.bound
  async getUserInfo() {
    try {
      this.setLoading(true);
      await sleep(100);
      const res = await UserApi.shared.getUserInfo();
      if (!res) {
        throw new Error();
      }
      this.setUserInfo(res.data.data);
      this.setLogin(true);
      return res.data.data;
    } catch (e) {
      console.warn('getUserInfo failed:', e);
      token.clear();
      this.setLogin(false);
      this.clearUserInfo();
    } finally {
      this.setLoading(false);
    }
  }

  @action.bound
  async clearUserInfo() {
    this.setUserInfo(null);
    this.setNickName('');
  }
}

export const userStore = new UserStore();
