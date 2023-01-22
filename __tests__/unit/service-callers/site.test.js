// Dependecies
import SiteServiceCaller from '../../../service-callers/site';
import serviceCaller from '../../../utils/service-caller';

// Dependency Mocks
jest.mock('../../../utils/service-caller', () => (
  jest.fn()
));

describe('SiteServiceCaller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getSiteInfo', () => {
    const testSiteId = 'testSiteId';
    it('should call /site-info/siteId', async () => {
      const testData = [{ id: 'testData' }];
      serviceCaller.mockResolvedValueOnce({ data: testData });

      const returnData = await SiteServiceCaller.getSiteInfo({
        siteId: testSiteId,
      });

      expect(serviceCaller).toHaveBeenCalledWith({
        method: 'get',
        url: `/site-info/${testSiteId}`,
      });
      expect(returnData).toStrictEqual(testData);
    });
    describe('Data is undefined', () => {
      it('should return undefined', async () => {
        serviceCaller.mockResolvedValueOnce(undefined);

        const returnData = await SiteServiceCaller.getSiteInfo({
          siteId: testSiteId,
        });

        expect(returnData).toStrictEqual(undefined);
      });
    });
  });
});
