// Services
import OutageService from './outage.js';

// Utils
import Logger from '../utils/logger.js';

// Config
import Config from '../config/index.js';

export default class MainService {
  static async run() {
    try {
      const siteOutages = await OutageService.getSiteOutages({ siteId: Config.specificSiteId });

      Logger.info(`Site (${Config.specificSiteId})`);
      siteOutages?.forEach((siteOutage) => {
        Logger.info(`${siteOutage.name} (${siteOutage.id}) - ${siteOutage.begin} -> ${siteOutage.end}`);
      });

      const { success } = await OutageService.addOutages({
        siteId: Config.specificSiteId,
        outages: siteOutages,
      });

      if (success) {
        Logger.info('Outages has been added');
      }
    } catch (error) {
      Logger.error(error.message);
    }
  }
}
