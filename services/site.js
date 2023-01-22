// Service Callers
import SiteServiceCaller from '../service-callers/site.js';

export default class SiteService {
  static async getSiteInfo({ siteId }) {
    const data = await SiteServiceCaller.getSiteInfo({ siteId });

    return data;
  }
}
