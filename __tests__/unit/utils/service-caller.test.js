import axios from 'axios';
import serviceCaller from '../../../utils/service-caller';

// Dependecies
import logger from '../../../utils/logger';
import Config from '../../../config';

// Dependency Mocks
jest.mock('axios');
jest.mock('../../../utils/logger', () => ({
  error: jest.fn(),
}));

describe('serviceCaller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call axios with the correct method, url, data, and headers', async () => {
    const method = 'POST';
    const url = '/example';
    const data = { test: 'data' };
    const query = { };
    const expectedUrl = new URL(`${Config.serviceUrl}/example`);
    const expectedHeaders = {
      accept: 'application/json',
      'x-api-key': Config.apiKey,
    };

    axios.mockResolvedValueOnce({ data: 'success' });

    await serviceCaller({
      method,
      url,
      data,
      query,
    });

    expect(axios).toHaveBeenCalledWith({
      method: 'post',
      headers: expectedHeaders,
      url: expectedUrl,
      data,
      query,
    });
  });

  it('should retry the call if axios returns a 500 status', async () => {
    const method = 'POST';
    const url = '/example';
    const data = { test: 'data' };
    const query = { };
    const expectedUrl = new URL(`${Config.serviceUrl}/example`);
    const expectedHeaders = {
      accept: 'application/json',
      'x-api-key': Config.apiKey,
    };

    axios
      .mockRejectedValueOnce({ response: { status: 500 } })
      .mockResolvedValueOnce({ data: 'success' });

    await serviceCaller({
      method, url, data, query,
    });

    expect(axios).toHaveBeenCalledWith({
      method: 'post',
      headers: expectedHeaders,
      url: expectedUrl,
      data,
      query,
    });
    expect(axios).toHaveBeenCalledTimes(2);
  });

  it('should reject with an error if all retries fail', async () => {
    const method = 'POST';
    const url = '/example';
    const data = { test: 'data' };
    const query = { test: 'query' };
    const expectedUrl = new URL(`${Config.serviceUrl}/example`);
    const expectedHeaders = {
      accept: 'application/json',
      'x-api-key': Config.apiKey,
    };
    const expectedError = { response: { status: 500 } };

    axios.mockRejectedValue(expectedError);

    await expect(serviceCaller({
      method, url, data, query,
    })).rejects.toEqual(expectedError);
    expect(axios).toHaveBeenCalledWith({
      method: 'post',
      headers: expectedHeaders,
      url: expectedUrl,
      data,
      query,
    });
    expect(axios).toHaveBeenCalledTimes(Config.retryAttemps);
    expect(logger.error).toHaveBeenCalledTimes(Config.retryAttemps - 1);
  });
});
