const client = require('./redis.js');

test('setData function exists', () => {
  expect(typeof client.setData).toEqual('function');
});

test('getData function exists', () => {
  expect(typeof client.getData).toEqual('function');
});