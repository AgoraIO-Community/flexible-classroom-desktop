import { request, Response } from '@app/utils/request';
import axios from 'axios';
import { getRegion } from '../stores/global';
import { ErrorCode, getApiDomain, getAppDomain, messageError } from '../utils';
import { getLSStore, LS_COMPANY_ID } from '../utils/local-storage';
import {
  RoomListRequest,
  RoomListResponse,
  RoomCreateRequest,
  RoomInfo,
  RoomJoinRequest,
  RoomJoinResponse,
  RoomJoinNoAuthRequest,
  RoomCreateResponse,
  RoomCredentialNoAuthRequest,
  RoomCredentialNoAuthResponse,
  RoomCredentialRequest,
  RoomCredentialResponse,
  RoomCreateNoAuthRequest,
} from './type';

export * from './type';

export class RoomAPI {
  private get appDomain() {
    return getAppDomain(getRegion());
  }

  private get apiDomain() {
    return getApiDomain(getRegion());
  }

  private get companyId() {
    return getLSStore(LS_COMPANY_ID);
  }

  /**
   * 获取教室列表
   * @param params
   * @returns
   *
   **/
  /** @en
   * Gets room list
   * @param params
   * @returns
   */
  public async list(params?: RoomListRequest) {
    const data = {
      count: 15,
      ...params,
    };
    const url = `${this.appDomain}/edu/companys/${this.companyId}/v1/rooms?count=${data.count}${
      data.nextId ? `&nextId=${data.nextId}` : ''
    }`;
    return request.get<Response<RoomListResponse>>(url);
  }

  /**
   * 创建教室
   * @param params
   * @returns
   *
   **/
  /** @en
   * Create room
   * @param params
   * @returns
   */
  public async create(params: RoomCreateRequest) {
    const url = `${this.appDomain}/edu/companys/${this.companyId}/v1/rooms`;
    return request.post<Response<RoomCreateResponse>>(url, params);
  }

  /**
   * 创建教室(免鉴权)
   * @param params
   * @returns
   *
   **/
  /** @en
   * Create room without auth
   * @param params
   * @returns
   */
  public async createNoAuth(params: RoomCreateNoAuthRequest) {
    const url = `${this.appDomain}/edu/companys/v1/rooms`;
    return request.post<Response<RoomCreateResponse>>(url, params);
  }

  /**
   * 通过房间ID查询房间信息
   * @param roomID
   * @returns
   *
   **/
  /** @en
   * Get room's info by id
   * @param roomID
   * @returns
   */
  public async getRoomInfoByID(roomID: string) {
    const url = `${this.appDomain}/edu/companys/${this.companyId}/v1/rooms/${roomID}`;
    return request.get<Response<RoomInfo>>(url);
  }
  /**
   * 通过房间ID查询房间信息(免鉴权)
   * @param roomID
   * @returns
   *
   **/
  /** @en
   * Get room's info by id without auth
   * @param roomID
   * @returns
   */
  public async getRoomInfoByIDNoAuth(roomID: string) {
    const url = `${this.appDomain}/edu/companys/v1/rooms/${roomID}`;
    return request.get<Response<RoomInfo>>(url).catch((error) => {
      console.warn('query room no auth api failed. error:%o', error);
      messageError(ErrorCode.ROOM_NOT_FOUND);
      throw error;
    });
  }
  /**
   * 加入教室
   * @param params
   * @returns
   *
   **/
  /** @en
   * Join room
   * @param params
   * @returns
   */
  public async join(params: RoomJoinRequest) {
    const url = `${this.appDomain}/edu/companys/${this.companyId}/v1/rooms`;
    return request.put<Response<RoomJoinResponse>>(url, params);
  }

  /**
   * 加入教室(免鉴权)
   * @param params
   * @returns
   *
   **/
  /** @en
   * Join room without auth
   * @param params
   * @returns
   */
  public async joinNoAuth(params: RoomJoinNoAuthRequest) {
    const url = `${this.appDomain}/edu/companys/v1/rooms`;
    return request.put<Response<RoomJoinResponse>>(url, params);
  }
  /**
   * 教室历史查询
   * @param roomID
   * @returns
   *
   **/
  /** @en
   * Get history of the room
   * @param roomID
   * @returns
   */
  public async history(roomID: string) {
    const url = `${this.appDomain}/edu/v2/rooms/${roomID}/history`;
    return request.get<Response<any>>(url);
  }

  /**
   * 获取加入教室的凭证
   * @param RoomCredentialRequest
   * @returns
   *
   **/
  /** @en
   * get credentials of the classroom.
   * @param RoomCredentialResponse
   * @returns
   */
  public async getCredential(params: RoomCredentialRequest): Promise<RoomCredentialResponse> {
    const { userUuid, roomUuid, role } = params;
    const { data } = await request.get(
      `${this.apiDomain}/edu/v4/rooms/${roomUuid}/roles/${role}/users/${userUuid}/token`,
    );
    return data.data;
  }

  /**
   * 获取加入教室的凭证(免鉴权)
   * @param RoomCredentialsNoAuthRequest
   * @returns
   *
   **/
  /** @en
   * get credentials of the classroom. (No authentication)
   * @param RoomCredentialsNoAuthRequest
   * @returns
   */
  public async getCredentialNoAuth(params: RoomCredentialNoAuthRequest) {
    const { userUuid, roomUuid, role } = params;
    const { data } = await axios.get<Response<RoomCredentialNoAuthResponse>>(
      `${this.apiDomain}/edu/v3/rooms/${roomUuid}/roles/${role}/users/${userUuid}/token`,
    );
    return data.data;
  }
}

export const roomApi = new RoomAPI();
