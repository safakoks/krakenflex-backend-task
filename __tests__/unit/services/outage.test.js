import OutageService from '../../../services/outage';

// Dependencies
import SiteService from '../../../services/site';
import OutageServiceCaller from '../../../service-callers/outage';
import OutageLogic from '../../../logics/outage';

// Dependency Mocks
jest.mock('../../../services/site', () => (
  {
    getSiteInfo: jest.fn(),
  }
));
jest.mock('../../../service-callers/outage', () => (
  {
    getOutages: jest.fn(),
    addOutagesToSite: jest.fn(),
  }
));

describe('OutageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be intialized correctly', async () => {
    expect(OutageService).toBeDefined();
  });

  describe('getSiteOutage', () => {
    const testSiteId = 'testSiteId';

    describe('siteId is undefined', () => {
      it('should throw "SiteId is Empty" error', async () => {
        await expect(OutageService.getSiteOutages({
          siteId: undefined,
        }))
          .rejects
          .toEqual(new Error('SiteId is Empty'));
      });
    });
    describe('siteId is defined', () => {
      it('should call getSiteInfo from SiteService', (done) => {
        SiteService.getSiteInfo.mockImplementationOnce(() => {
          expect(SiteService.getSiteInfo).toHaveBeenCalledWith({
            siteId: testSiteId,
          });
          expect(SiteService.getSiteInfo).toHaveBeenCalledTimes(1);
          done();
        });

        OutageService.getSiteOutages({
          siteId: testSiteId,
        });
      });

      describe('No Site', () => {
        it('should throw "Site not found" error', async () => {
          SiteService.getSiteInfo.mockResolvedValueOnce(undefined);

          await expect(OutageService.getSiteOutages({
            siteId: testSiteId,
          }))
            .rejects
            .toEqual(new Error('Site not found'));
        });
      });

      describe('Site exists', () => {
        describe('No devices in Site', () => {
          it('should throw "No devices" error', async () => {
            SiteService.getSiteInfo.mockResolvedValueOnce({
              devices: [],
            });

            await expect(OutageService.getSiteOutages({
              siteId: testSiteId,
            }))
              .rejects
              .toEqual(new Error('No devices'));
          });
        });

        describe('Devices exist in Site', () => {
          it('should call getOutages from OutageServiceCaller', (done) => {
            SiteService.getSiteInfo.mockResolvedValueOnce({
              devices: [{
                id: 'testDevice',
              }],
            });

            OutageServiceCaller.getOutages.mockImplementationOnce(() => {
              expect(OutageServiceCaller.getOutages).toHaveBeenCalledWith();
              expect(OutageServiceCaller.getOutages).toHaveBeenCalledTimes(1);
              done();
            });

            OutageService.getSiteOutages({
              siteId: testSiteId,
            });
          });
          describe('Outages is empty array', () => {
            it('should throw "No Outages" error', async () => {
              SiteService.getSiteInfo.mockResolvedValueOnce({
                devices: [{
                  id: 'testDevice',
                }],
              });

              OutageServiceCaller.getOutages.mockResolvedValueOnce([]);

              await expect(OutageService.getSiteOutages({
                siteId: testSiteId,
              })).rejects.toEqual(new Error('No Outages'));
            });
          });

          describe('Outages exist', () => {
            it('should call filterAndMapOutages from OutageLogic', async () => {
              const testSite = {
                devices: [{
                  id: 'testDevice',
                }],
              };
              const testOutages = [{
                id: 'outageTest',
              }];
              const testReturnData = [{ id: 'TestData' }];
              SiteService.getSiteInfo.mockResolvedValueOnce(testSite);
              OutageServiceCaller.getOutages.mockResolvedValueOnce(testOutages);

              jest.spyOn(OutageLogic, 'filterAndMapOutages').mockReturnValueOnce(testReturnData);

              const returnData = await OutageService.getSiteOutages({
                siteId: testSiteId,
              });

              expect(OutageLogic.filterAndMapOutages).toHaveBeenCalledWith({
                outages: testOutages,
                devices: testSite.devices,
              });
              expect(OutageLogic.filterAndMapOutages).toHaveBeenCalledTimes(1);
              expect(returnData).toStrictEqual(testReturnData);
            });
          });
        });
      });
    });

    describe('No Devices', () => {
      it('should throw "SiteId is Empty" error', async () => {
        await expect(OutageService.getSiteOutages({
          siteId: undefined,
        }))
          .rejects
          .toEqual(new Error('SiteId is Empty'));
      });
    });
  });

  describe('addOutages', () => {
    const testSiteId = 'testSiteId';
    const testOutagesArray = [{ id: 'TestOutage' }];
    describe('siteId is undefined', () => {
      it('should throw "SiteId is Empty" error', async () => {
        await expect(OutageService.addOutages({
          siteId: undefined,
          outages: testOutagesArray,
        }))
          .rejects
          .toEqual(new Error('SiteId is Empty'));
      });
    });
    describe('siteId is defined', () => {
      describe('outages is empty array', () => {
        it('should throw "Outages is Empty" error', async () => {
          await expect(OutageService.addOutages({
            siteId: testSiteId,
            outages: [],
          }))
            .rejects
            .toEqual(new Error('Outages is Empty'));
        });
      });

      describe('outages exist', () => {
        it('should call addOutagesToSite from OutageServiceCaller', async () => {
          OutageServiceCaller.addOutagesToSite.mockResolvedValueOnce({ success: true });

          const { success } = await OutageService.addOutages({
            siteId: testSiteId,
            outages: testOutagesArray,
          });

          expect(OutageServiceCaller.addOutagesToSite).toHaveBeenCalledWith({
            siteId: testSiteId,
            outages: testOutagesArray,
          });
          expect(OutageServiceCaller.addOutagesToSite).toHaveBeenCalledTimes(1);
          expect(success).toStrictEqual(true);
        });
      });
    });
  });
});
