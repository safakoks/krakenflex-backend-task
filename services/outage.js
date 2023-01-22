// Service Callers
import OutageServiceCaller from '../service-callers/outage.js';

// Services
import SiteService from './site.js';

// Logics
import CommonLogic from '../logics/common.js';
import OutageLogic from '../logics/outage.js';

export default class OutageService {
  static async getSiteOutages({ siteId }) {
    if (!siteId) {
      throw new Error('SiteId is Empty');
    }

    const currentSite = await SiteService.getSiteInfo({ siteId });

    if (!currentSite) {
      throw new Error('Site not found');
    }

    if (CommonLogic.isEmptyArray(currentSite.devices)) {
      throw new Error('No devices');
    }

    const allOutages = await OutageServiceCaller.getOutages();

    if (CommonLogic.isEmptyArray(allOutages)) {
      throw new Error('No Outages');
    }

    const outagesOfCurrentSite = OutageLogic.filterAndMapOutages({
      outages: allOutages,
      devices: currentSite.devices,
    });

    return outagesOfCurrentSite;
  }

  static async addOutages({ siteId, outages }) {
    if (!siteId) {
      throw new Error('SiteId is Empty');
    }

    if (CommonLogic.isEmptyArray(outages)) {
      throw new Error('Outages is Empty');
    }

    const { success } = await OutageServiceCaller.addOutagesToSite({ siteId, outages });

    return {
      success,
    };
  }
}
