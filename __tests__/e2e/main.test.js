import MainService from '../../services/main.js';

// Dependencies
import OutageServiceCaller from '../../service-callers/outage.js';
import SiteServiceCaller from '../../service-callers/site.js';
import Config from '../../config/index.js';

// Dependency Mocks
jest.mock('../../service-callers/outage', () => ({
  getOutages: jest.fn(),
  addOutagesToSite: jest.fn(),
}));

jest.mock('../../service-callers/site', () => ({
  getSiteInfo: jest.fn(),
}));

jest.mock('../../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe('Main E2E Test', () => {
  beforeEach(() => {
    OutageServiceCaller.getOutages.mockResolvedValue([
      {
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        begin: '2021-07-26T17:09:31.036Z',
        end: '2021-08-29T00:37:42.253Z',
      },
      {
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        begin: '2022-05-23T12:21:27.377Z',
        end: '2022-11-13T02:16:38.905Z',
      },
      {
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        begin: '2022-12-04T09:59:33.628Z',
        end: '2022-12-12T22:35:13.815Z',
      },
      {
        id: '04ccad00-eb8d-4045-8994-b569cb4b64c1',
        begin: '2022-07-12T16:31:47.254Z',
        end: '2022-10-13T04:05:10.044Z',
      },
      {
        id: '086b0d53-b311-4441-aaf3-935646f03d4d',
        begin: '2022-07-12T16:31:47.254Z',
        end: '2022-10-13T04:05:10.044Z',
      },
      {
        id: '27820d4a-1bc4-4fc1-a5f0-bcb3627e94a1',
        begin: '2021-07-12T16:31:47.254Z',
        end: '2022-10-13T04:05:10.044Z',
      },
    ]);
    SiteServiceCaller.getSiteInfo.mockResolvedValue(
      {
        id: 'kingfisher',
        name: 'KingFisher',
        devices: [
          {
            id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
            name: 'Battery 1',
          },
          {
            id: '086b0d53-b311-4441-aaf3-935646f03d4d',
            name: 'Battery 2',
          },
        ],
      },
    );
  });

  it('Kingfisher Case', async () => {
    const expectedValue = [
      {
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        name: 'Battery 1',
        begin: '2022-05-23T12:21:27.377Z',
        end: '2022-11-13T02:16:38.905Z',
      },
      {
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        name: 'Battery 1',
        begin: '2022-12-04T09:59:33.628Z',
        end: '2022-12-12T22:35:13.815Z',
      },
      {
        id: '086b0d53-b311-4441-aaf3-935646f03d4d',
        name: 'Battery 2',
        begin: '2022-07-12T16:31:47.254Z',
        end: '2022-10-13T04:05:10.044Z',
      },
    ];

    await MainService.run();

    expect(SiteServiceCaller.getSiteInfo).toHaveBeenCalledWith(
      {
        siteId: Config.specificSiteId,
      },
    );
    expect(OutageServiceCaller.addOutagesToSite).toHaveBeenCalledWith(
      {
        siteId: Config.specificSiteId,
        outages: expectedValue,
      },
    );
    expect(OutageServiceCaller.getOutages).toHaveBeenCalledTimes(1);
  });
});
