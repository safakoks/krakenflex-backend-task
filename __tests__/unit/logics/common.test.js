import CommonLogic from '../../../logics/common';

describe('CommonLogic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isEmptyArray', () => {
    describe('Empty Array', () => {
      it('should return True', () => {
        const result = CommonLogic.isEmptyArray([]);

        expect(result).toStrictEqual(true);
      });
    });
    describe('Undefined Array', () => {
      it('should return True', () => {
        const result = CommonLogic.isEmptyArray(undefined);

        expect(result).toStrictEqual(true);
      });
    });

    describe('Defined Array', () => {
      it('should return false', () => {
        const result = CommonLogic.isEmptyArray([{ id: 'test' }]);

        expect(result).toStrictEqual(false);
      });
    });
  });
});
