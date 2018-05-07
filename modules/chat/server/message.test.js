let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const res = generateMessage('David', 'Hello There');

    expect(res).toMatchObject({
      from: 'David',
      text: 'Hello There'
    });
    expect(typeof res.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const res = generateLocationMessage('David', 15, 19);

    expect(res).toMatchObject({
      from: 'David',
      url: 'https://www.google.com/maps?q=15,19'
    });
    expect(typeof res.createdAt).toBe('number');
  });
});
