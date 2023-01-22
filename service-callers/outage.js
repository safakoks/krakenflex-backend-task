import serviceCaller from '../utils/service-caller.js';

export default class OutageServiceCaller {
  static async getOutages() {
    const result = await serviceCaller({
      method: 'get',
      url: '/outages',
    });

    return result?.data;
  }

  static async addOutagesToSite({
    siteId,
    outages,
  }) {
    await serviceCaller({
      method: 'post',
      url: `/site-outages/${siteId}`,
      data: outages,
    });

    return {
      success: true,
    };
  }
}
