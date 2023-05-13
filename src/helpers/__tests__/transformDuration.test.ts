import transformDuration from '../transformDuration';

describe('transformDuration', () => {
  it('transforms duration correctly', () => {
    expect(transformDuration(12345678)).toBe('3 時 25 分');
    expect(transformDuration(3600000)).toBe('1 時');
    expect(transformDuration(300000)).toBe('5 分');
  });
});
