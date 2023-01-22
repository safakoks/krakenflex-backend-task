import serviceCaller from '../utils/service-caller.js';

export default class SiteServiceCaller {
  static async getSiteInfo({ siteId }) {
    const result = await serviceCaller({
      method: 'get',
      url: `/site-info/${siteId}`,
    });

    return result?.data;
  }
}
