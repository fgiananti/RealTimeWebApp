let expect = require('expect');

let {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const res = isRealString(98);

    expect(res).toBe(false);
  });

  it('should reject string with only spaces', () => {
    const res = isRealString('    ');

    expect(res).toBe(false);
  });

  it('should allow string with non-sapce characters', () => {
    const res = isRealString('olaola');

    expect(res).toBe(true);
  });
});
