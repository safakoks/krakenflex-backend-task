import MainService from '../../../services/main';

// Dependencies
import OutageService from '../../../services/outage';
// Dependency Mocks
jest.mock('../../../services/outage', () => (
  {
    getSiteOutages: jest.fn(),
    addOutages: jest.fn(),
  }
));
jest.mock('../../../utils/logger', () => ({
  info: jest.fn(),
}));

import Config from '../../../config'
import logger from '../../../utils/logger';

describe('MainService', () => {
  it('should be intialized correctly', async () => {
    expect(MainService).toBeDefined();
  });
  describe('run', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call getSiteOutages from OutageService', async () => {
      OutageService.addOutages.mockReturnValue({});

      await MainService.run();

      expect(OutageService.getSiteOutages).toHaveBeenCalledWith({
        siteId: Config.specificSiteId,
      });
      expect(OutageService.getSiteOutages).toHaveBeenCalledTimes(1);
    });

    it('should call addOutages from OutageService', async () => {
      const testSiteOutages = [{ id: 'test' }];

      OutageService.getSiteOutages.mockReturnValue(testSiteOutages);
      OutageService.addOutages.mockReturnValue({
        success: true,
      });

      await MainService.run();

      expect(OutageService.addOutages).toHaveBeenCalledWith({
        siteId: Config.specificSiteId,
        outages: testSiteOutages,
      });
      expect(OutageService.addOutages).toHaveBeenCalledTimes(1);
      expect(logger.info).toHaveBeenCalledTimes(3);
    });
  });
});
