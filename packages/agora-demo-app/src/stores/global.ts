import { LS_LANGUAGE, LS_LAUNCH, LS_REGION, LS_THEME, getBrowserLanguage } from '@app/utils';
import { FcrMultiThemeMode, changeLanguage } from 'agora-common-libs';
import type { EduRegion, EduRoleTypeEnum, EduRoomTypeEnum } from 'agora-edu-core';
import type { LanguageEnum } from 'agora-classroom-sdk';
import { action, observable, toJS, computed, runInAction } from 'mobx';
import { clearLSStore, getLSStore, setLSStore } from '../utils';
import { SdkType } from '@app/type';

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
  sdkType: SdkType;
  roomType: EduRoomTypeEnum;
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

      this.language = (getLSStore<string>(LS_LANGUAGE) || getBrowserLanguage()) as LanguageEnum;

      this.region = getRegion();

      this.theme = getTheme();

      changeLanguage(this.language);
    });
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

  @computed
  get launchConfig() {
    const config = toJS(this.launchOption);
    return config;
  }

  @action.bound
  clear() {
    clearLSStore(LS_LAUNCH);
    clearLSStore(LS_REGION);
    clearLSStore(LS_LANGUAGE);
    clearLSStore(LS_THEME);

    this.language = (getLSStore<string>(LS_LANGUAGE) || getBrowserLanguage()) as LanguageEnum;
    this.region = getRegion();
    this.theme = getTheme();
    //@ts-ignore
    this.launchOption = {};
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
