import SiteService from '../../../services/site';

// Dependencies
import SiteServiceCaller from '../../../service-callers/site';

describe('SiteService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be intialized correctly', async () => {
    expect(SiteService).toBeDefined();
  });
  describe('getSiteInfo', () => {
    const testSiteId = 'testSiteId';
    const testData = [{ id: 'test' }];

    beforeEach(() => {
      SiteServiceCaller.getSiteInfo = jest.fn().mockResolvedValue(testData);
    });

    it('should call getSiteInfo from SiteServiceCaller', async () => {
      await SiteService.getSiteInfo({
        siteId: testSiteId,
      });

      expect(SiteServiceCaller.getSiteInfo).toHaveBeenCalledWith({
        siteId: testSiteId,
      });
      expect(SiteServiceCaller.getSiteInfo).toHaveBeenCalledTimes(1);
    });

    it('should return data from SiteServiceCaller', async () => {
      const returnData = await SiteService.getSiteInfo({
        siteId: testSiteId,
      });

      expect(returnData).toStrictEqual(testData);
    });
  });
});
