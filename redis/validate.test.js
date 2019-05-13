const validate = require('./validate.js');

describe('strCheck function', () => {
  it('is a function', () => {
    expect(typeof validate.dataCheck).toEqual('function');
  });

  it('returns true if string || number', () => {
    expect(validate.dataCheck('a')).toEqual(true);
    expect(validate.dataCheck(2)).toEqual(true);
  });

  it('works with numbers & characters in the string', () => {
    expect(validate.dataCheck('aa24$%@!@!dad12238789ada')).toEqual(true);
  });

  it('returns false if !string', () => {
    expect(validate.dataCheck(true)).toEqual(false);
    expect(validate.dataCheck(false)).toEqual(false);
    expect(validate.dataCheck(null)).toEqual(false);
  });
});

describe('cleanStr function', () => {
  it('is a function', () => {
    expect(typeof validate.cleanData).toEqual('function');
  });

  it('removes <html> and special characters', () => {
    expect(validate.cleanData('<h1>Hi</h1>')).toEqual('h1Hih1');
    expect(validate.cleanData('#something#!(#*)')).toEqual('something');
  });
});

