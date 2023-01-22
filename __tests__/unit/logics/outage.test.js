import OutageLogic from '../../../logics/outage';

describe('OutageLogic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('filterAndMapOutages', () => {
    describe('When outages is empty array', () => {
      it('should return empty array', () => {
        const result = OutageLogic.filterAndMapOutages({
          outages: [],
          devices: [{
            id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
            name: 'Battery 1',
          }],
        });

        expect(result).toStrictEqual([]);
      });
    });

    describe('When testDevices is empty array', () => {
      it('should return empty array', () => {
        const result = OutageLogic.filterAndMapOutages({
          outages: [{
            id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
            begin: '2021-07-26T17:09:31.036Z',
            end: '2021-08-29T00:37:42.253Z',
          }],
          devices: [],
        });

        expect(result).toStrictEqual([]);
      });
    });

    describe('When there are devices and outages', () => {
      describe('Case 1 : Format', () => {
        const testOutages = [
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
        ];
        const testDevices = [
          {
            id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
            name: 'Battery 1',
          },
          {
            id: '086b0d53-b311-4441-aaf3-935646f03d4d',
            name: 'Battery 2',
          },
        ];

        const expectedResult = [
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

        it('should format and map', () => {
          const result = OutageLogic.filterAndMapOutages({
            outages: testOutages,
            devices: testDevices,
          });

          expect(result).toStrictEqual(expectedResult);
        });
      });

      describe('Case 2 : Filter', () => {
        const testOutages = [
          {
            id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
            begin: '2021-07-26T17:09:31.036Z',
            end: '2021-08-29T00:37:42.253Z',
          },
          {
            id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
            begin: '2022-01-01T00:00:00.000Z',
            end: '2022-11-13T02:16:38.905Z',
          },
          {
            id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
            begin: '2020-12-04T09:59:33.628Z',
            end: '2020-12-12T22:35:13.815Z',
          },
          {
            id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
            begin: '2020-11-04T09:59:33.628Z',
            end: '2020-11-12T22:35:13.815Z',
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
            id: '086b0d53-b311-4441-aaf3-935646f03d4d',
            begin: '2020-07-12T16:31:47.254Z',
            end: '2020-10-13T04:05:10.044Z',
          },
          {
            id: '27820d4a-1bc4-4fc1-a5f0-bcb3627e94a1',
            begin: '2021-07-12T16:31:47.254Z',
            end: '2022-10-13T04:05:10.044Z',
          },
        ];
        const testDevices = [
          {
            id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
            name: 'Battery 1',
          },
          {
            id: '086b0d53-b311-4441-aaf3-935646f03d4d',
            name: 'Battery 2',
          },
        ];

        const expectedResult = [
          {
            id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
            name: 'Battery 1',
            begin: '2022-01-01T00:00:00.000Z',
            end: '2022-11-13T02:16:38.905Z',
          },
          {
            id: '086b0d53-b311-4441-aaf3-935646f03d4d',
            name: 'Battery 2',
            begin: '2022-07-12T16:31:47.254Z',
            end: '2022-10-13T04:05:10.044Z',
          },
        ];

        it('should filter and format with limitDate', () => {
          const result = OutageLogic.filterAndMapOutages({
            outages: testOutages,
            devices: testDevices,
          });

          expect(result).toStrictEqual(expectedResult);
        });
      });
    });
  });
});
