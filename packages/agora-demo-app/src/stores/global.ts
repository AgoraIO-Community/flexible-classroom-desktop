import {
  LS_LANGUAGE,
  LS_LAUNCH,
  LS_ORIGIN_LAUNCH,
  LS_REGION,
  LS_THEME,
  getBrowserLanguage,
} from '@app/utils';
import { FcrMultiThemeMode, bound, changeLanguage } from 'agora-common-libs';
import type { EduRegion, EduRoleTypeEnum, EduRoomTypeEnum } from 'agora-edu-core';
import type { LanguageEnum } from 'agora-classroom-sdk';
import { action, observable, toJS, computed, runInAction } from 'mobx';
import { clearLSStore, getLSStore, setLSStore } from '../utils';
import { SceneType } from '@app/type';
export enum LoginTypeEnum {
  WithoutLogin = 0,
  NeedLogin = 1,
}
export interface ToastType {
  id: string;
  desc: string;
  type?: 'success' | 'error' | 'warning';
}

export type GlobalLaunchOption = {
  appId: string;
  userUuid: string;
  userName: string;
  roomUuid: string;
  roomName: string;
  sdkDomain: string;
  scenes?: any;
  themes?: any;
  roomType: EduRoomTypeEnum;
  sceneType: SceneType;
  roleType: EduRoleTypeEnum;
  returnToPath: string;
  rtmToken: string;
  [key: string]: any;
};

export const regionByLang = {
  zh: 'CN',
  en: 'NA',
};

export const getRegion = (): EduRegion => {
  return (getLSStore(LS_REGION) || regionByLang[getBrowserLanguage()] || 'NA') as EduRegion;
};

export const getTheme = (): FcrMultiThemeMode => {
  return getLSStore(LS_THEME) || FcrMultiThemeMode.light;
};

export class GlobalStore {
  blockQuitUnregister: () => void = () => {};
  loginType = LoginTypeEnum.WithoutLogin;
  @observable
  originLaunchOption: Record<'userName' | 'roomName', string> = { userName: '', roomName: '' };

  @observable
  launchOption: Partial<GlobalLaunchOption> = {};

  @observable
  region = 'CN' as EduRegion;

  @observable
  language = 'zh' as LanguageEnum;

  @observable
  theme = {} as FcrMultiThemeMode;

  @observable
  toastList: ToastType[] = [];

  constructor() {
    runInAction(() => {
      this.launchOption = getLSStore<GlobalLaunchOption>(LS_LAUNCH) || {};

      this.originLaunchOption = getLSStore<Record<'userName' | 'roomName', string>>(
        LS_ORIGIN_LAUNCH,
      ) || { userName: '', roomName: '' };

      this.language = (getLSStore<string>(LS_LANGUAGE) || getBrowserLanguage()) as LanguageEnum;

      this.region = getRegion();

      this.theme = getTheme();

      changeLanguage(this.language);
    });
  }
  @bound
  setLoginType(type: LoginTypeEnum) {
    this.loginType = type;
  }
  @action.bound
  addToast(toast: ToastType) {
    this.toastList.push(toast);
  }

  @action.bound
  removeToast(id: string) {
    this.toastList = this.toastList.filter((it) => it.id != id);
  }

  @action.bound
  setRegion(region: EduRegion) {
    console.log('Region changed:', this.region);
    this.region = region;
    setLSStore(LS_REGION, this.region);
  }

  @action.bound
  setTheme(theme: FcrMultiThemeMode) {
    console.log('Theme changed:', this.theme);
    this.theme = theme;
    setLSStore(LS_THEME, this.theme);
  }

  @action.bound
  setLanguage(language: LanguageEnum) {
    console.log('Language changed:', this.language);
    this.language = language;
    setLSStore(LS_LANGUAGE, this.language);
    changeLanguage(this.language);
  }

  @action.bound
  setLaunchConfig(payload: GlobalLaunchOption) {
    console.log('Launch option changed:', this.launchOption);
    this.launchOption = payload;
    setLSStore(LS_LAUNCH, toJS(this.launchOption));
  }
  @action.bound
  setOriginLaunchConfig(payload: Record<'userName' | 'roomName', string>) {
    console.log('Origin launch option changed:', this.originLaunchOption);
    this.originLaunchOption = payload;
    setLSStore(LS_ORIGIN_LAUNCH, toJS(this.originLaunchOption));
  }
  @computed
  get launchConfig() {
    const config = toJS(this.launchOption);
    return config;
  }
  @computed
  get originLaunchConfig() {
    const config = toJS(this.originLaunchOption);
    return config;
  }
  @action.bound
  clear() {
    clearLSStore(LS_LAUNCH);
    clearLSStore(LS_REGION);
    clearLSStore(LS_LANGUAGE);
    clearLSStore(LS_THEME);
    clearLSStore(LS_LAUNCH);
    clearLSStore(LS_ORIGIN_LAUNCH);

    this.language = (getLSStore<string>(LS_LANGUAGE) || getBrowserLanguage()) as LanguageEnum;
    this.region = getRegion();
    this.theme = getTheme();
    //@ts-ignore
    this.launchOption = {};
    this.originLaunchOption = { userName: '', roomName: '' };
  }

  @observable
  loading = false;

  @action.bound
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  get isRegionSet() {
    return !!getLSStore(LS_REGION);
  }
}

export const globalStore = new GlobalStore();
