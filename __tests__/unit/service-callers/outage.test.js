// Dependecies
import OutageServiceCaller from '../../../service-callers/outage';
import serviceCaller from '../../../utils/service-caller';

// Dependency Mocks
jest.mock('../../../utils/service-caller', () => (
  jest.fn()
));

describe('OutageServiceCaller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getOutages', () => {
    it('should call /outages', async () => {
      const testData = [{ id: 'testData' }];

      serviceCaller.mockResolvedValueOnce({ data: testData });

      const returnData = await OutageServiceCaller.getOutages();

      expect(serviceCaller).toHaveBeenCalledWith({
        method: 'get',
        url: '/outages',
      });
      expect(returnData).toStrictEqual(testData);
    });

    describe('Data is undefined', () => {
      it('should return undefined', async () => {
        serviceCaller.mockResolvedValueOnce(undefined);

        const returnData = await OutageServiceCaller.getOutages();

        expect(serviceCaller).toHaveBeenCalledWith({
          method: 'get',
          url: '/outages',
        });
        expect(returnData).toStrictEqual(undefined);
      });
    });
  });

  describe('addOutagesToSite', () => {
    it('should call /site-outages/siteId', async () => {
      const testSiteId = 'testSiteId';
      const testOutages = [{ id: 'testOutage' }];

      const returnData = await OutageServiceCaller.addOutagesToSite({
        siteId: testSiteId,
        outages: testOutages,
      });

      expect(serviceCaller).toHaveBeenCalledWith({
        method: 'post',
        url: `/site-outages/${testSiteId}`,
        data: testOutages,
      });
      expect(returnData).toStrictEqual({ success: true });
    });
  });
});
