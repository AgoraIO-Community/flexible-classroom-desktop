import { transI18n } from 'agora-common-libs';
import { action, observable } from 'mobx';
import {
  roomApi,
  RoomCreateNoAuthRequest,
  RoomCreateRequest,
  RoomInfo,
  RoomJoinNoAuthRequest,
  RoomJoinRequest,
} from '../api/room';
import { ErrorCode, messageError } from '../utils/error';
import { ToastType } from './global';

export class RoomStore {
  @observable
  fetching = false;

  @observable
  total = 0;

  @observable
  nextId: string | undefined = undefined;

  @observable
  roomToastList: ToastType[] = [];

  rooms = observable.map<string, RoomInfo>();

  @action.bound
  addRoomToast(toast: ToastType) {
    this.roomToastList.push(toast);
  }

  @action.bound
  removeRoomToast(id: string) {
    this.roomToastList = this.roomToastList.filter((it) => it.id != id);
  }

  @action.bound
  async clearRooms() {
    this.rooms.clear();
    this.setNextId(undefined);
    this.setTotal(0);
  }

  @action.bound
  async createRoom(params: RoomCreateRequest) {
    const {
      data: { data },
    } = await roomApi.create(params);
    const toast: ToastType = {
      id: data.roomId,
      type: 'success',
      desc: transI18n('fcr_create_tips_create_success'),
    };
    this.refreshRoomList();
    this.addRoomToast(toast);
    setTimeout(() => {
      this.removeRoomToast(data.roomId);
    }, 4000);
    return data;
  }

  @action.bound
  async createRoomNoAuth(params: RoomCreateNoAuthRequest) {
    const {
      data: { data },
    } = await roomApi.createNoAuth(params);
    return data;
  }

  @action.bound
  async refreshRoomList() {
    this.setFetching(true);
    try {
      const {
        data: { data },
      } = await roomApi.list();
      const { list, nextId, total } = data;
      this.setNextId(nextId);
      this.setTotal(total);
      this.rooms.clear();
      for (const room of list) {
        this.updateRoom(room.roomId, room);
      }
      this.setFetching(false);
      return data;
    } catch {
      this.setFetching(false);
      return Promise.reject('refresh room list api failed');
    }
  }

  @action.bound
  async fetchMoreRoomList() {
    this.setFetching(true);
    try {
      const {
        data: { data },
      } = await roomApi.list({ nextId: this.nextId });
      const { list, nextId, total } = data;
      this.setTotal(total);
      this.setNextId(nextId);
      for (const room of list) {
        this.updateRoom(room.roomId, room);
      }
      this.setFetching(false);
      return data;
    } catch {
      this.setFetching(false);
      return Promise.reject('refresh room list api failed');
    }
  }

  @action.bound
  updateRoom(roomId: string, roomInfo: RoomInfo): void {
    const room = this.rooms.get(roomId);
    if (room) {
      const keys = Object.keys(roomInfo) as unknown as Array<keyof RoomInfo>;
      for (const key of keys) {
        if (key !== 'roomId') {
          (room[key] as any) = roomInfo[key];
        }
      }
    } else {
      this.rooms.set(roomId, { ...roomInfo, roomId });
    }
  }

  @action.bound
  async joinRoom(params: RoomJoinRequest) {
    return roomApi.join(params).catch((error) => {
      console.warn('join room api failed. error:%o', error);
      if (error?.response?.data?.code === ErrorCode.COURSE_HAS_ENDED) {
        messageError(ErrorCode.COURSE_HAS_ENDED);
      } else {
        messageError(ErrorCode.ROOM_NOT_FOUND);
      }
      return error;
    });
  }

  @action.bound
  async joinRoomNoAuth(params: RoomJoinNoAuthRequest) {
    return roomApi.joinNoAuth(params).catch((error) => {
      console.warn('join room no auth api failed. error:%o', error);
      if (error?.response?.data?.code === ErrorCode.COURSE_HAS_ENDED) {
        messageError(ErrorCode.COURSE_HAS_ENDED);
      } else {
        messageError(ErrorCode.ROOM_NOT_FOUND);
      }
      return error;
    });
  }

  @action.bound
  private setTotal(total: number): void {
    this.total = total;
  }

  @action.bound
  private setNextId(nextId: string | undefined): void {
    this.nextId = nextId;
  }
  @action.bound
  private setFetching(fetching: boolean): void {
    this.fetching = fetching;
  }
}

export const roomStore = new RoomStore();
