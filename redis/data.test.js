const data = require('./data.js');

describe('strCheck function', () => {
  it('is a function', () => {
    expect(typeof data.dataCheck).toEqual('function');
  });

  it('returns true if string || number', () => {
    expect(data.dataCheck('a')).toEqual(true);
    expect(data.dataCheck(2)).toEqual(true);
  });

  it('works with numbers & characters in the string', () => {
    expect(data.dataCheck('aa24$%@!@!dad12238789ada')).toEqual(true);
  });

  it('returns false if !string', () => {
    expect(data.dataCheck(true)).toEqual(false);
    expect(data.dataCheck(false)).toEqual(false);
    expect(data.dataCheck(null)).toEqual(false);
  });
});

describe('cleanStr function', () => {
  it('is a function', () => {
    expect(typeof data.cleanData).toEqual('function');
  });

  it('removes <html> and special characters', () => {
    expect(data.cleanData('<h1>Hi</h1>')).toEqual('h1Hih1');
    expect(data.cleanData('#something#!(#*)')).toEqual('something');
  });
});

