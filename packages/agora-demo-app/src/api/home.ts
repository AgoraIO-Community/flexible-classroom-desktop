import { getRegion } from '@app/stores/global';
import { request } from '@app/utils/request';
import { EduRegion } from 'agora-edu-core';
import { getApiDomain, getAppDomain } from '../utils';

export class HomeApi {
  private get apiDomain() {
    return getApiDomain(getRegion());
  }

  private appDomain(region: EduRegion) {
    return getAppDomain(region);
  }

  async getRecordations(roomUuid: string): Promise<any> {
    const { data } = await request.get(`${this.apiDomain}/edu/v2/rooms/${roomUuid}/records`);
    return data.data;
  }

  public async getBuilderResource(
    companyId: string,
    projectId: string,
    region: EduRegion = EduRegion.CN,
  ): Promise<any> {
    const { data } = await request.get(
      `${this.appDomain(region)}/builder/companys/${companyId}/v1/projects/${projectId}/preview`,
    );

    return data;
  }
}

export const homeApi = new HomeApi();
