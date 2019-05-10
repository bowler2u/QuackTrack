const data = require('./data.js');

// Test 'strCheck()'

test('dataCheck is a function', () => {
  expect(typeof data.dataCheck).toEqual('function');
});

test('Return true if string || number', () => {
  expect(data.dataCheck('a')).toEqual(true);
	expect(data.dataCheck(2)).toEqual(true);
});

test('Works with numbers & Characters in the string', () => {
  expect(data.dataCheck('aa24$%@!@!dad12238789ada')).toEqual(true);
});

test('Return false if !string', () => {
	expect(data.dataCheck(true)).toEqual(false);
	expect(data.dataCheck(false)).toEqual(false);
	expect(data.dataCheck(null)).toEqual(false);
	
});


// Test 'cleanStr()

test('cleanData is a function', () => {
  expect(typeof data.cleanData).toEqual('function');
});

test('cleanData removes <html> & special characters', () => {
  expect(data.cleanData('<h1>Hi</h1>')).toEqual('h1Hih1');
	expect(data.cleanData('#something#!(#*)')).toEqual('something');
});

