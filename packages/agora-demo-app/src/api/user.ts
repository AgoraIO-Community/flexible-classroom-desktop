import { getRegion } from '@app/stores/global';
import { request, Response } from '@app/utils/request';
import axios from 'axios';
import { getAppDomain } from '../utils/domain';

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type UserInfo = {
  companyId: string; // 客户信息
  companyName: string; // 客户名称
  userId: string; // 账户类型
  language: string; //偏好语言
  accountUid: string;
  accountType: string;
  displayName: string;
  email: string;
};

type GetAuthorizedURLRequest = {
  redirectUrl: string;
  toRegion?: string;
};

type GetAuthorizedURLResponse = string;

export class UserApi {
  static shared = new UserApi();

  private get appDomain() {
    return getAppDomain(getRegion());
  }

  public async getAuthorizedURL(params: GetAuthorizedURLRequest) {
    const url = `${this.appDomain}/sso/v2/users/oauth/redirectUrl`;
    const { data } = await axios.post<Response<GetAuthorizedURLResponse>>(url, params);
    return data.data;
  }

  /**
   * 获取用户信息
   * @returns
   *
   **/
  /** @en
   * Get user's info
   * @returns
   */
  public async getUserInfo() {
    const url = `${this.appDomain}/sso/v2/users/info`;
    return await request.get<Response<UserInfo>>(url);
  }

  /**
   * 刷新token
   * @returns
   *
   **/
  /** @en
   * Refresh token
   * @returns
   */
  public async refreshToken(refreshToken: string) {
    const url = `${this.appDomain}/sso/v2/users/refresh/refreshToken/${refreshToken}`;
    return request.post<Response<RefreshTokenResponse>>(url);
  }

  /**
   * 退出账户
   * @returns
   *
   **/
  /** @en
   * Close Account
   * @returns
   */
  public async logoutAccount() {
    const url = `${this.appDomain}/sso/v2/users/logout`;
    return request.delete<Response<null>>(url);
  }
}
