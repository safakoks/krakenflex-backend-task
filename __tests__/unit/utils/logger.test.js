import Logger from '../../../utils/logger';

describe('Logger Util', () => {
  describe('Initializing', () => {
    it('should be initialized', async () => {
      const myLogger = Logger;

      expect(myLogger).toBeTruthy();
    });
  });
});
