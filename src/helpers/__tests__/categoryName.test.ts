import { mergeCategoryName, splitCategoryName } from '../categoryName';

describe('splitCategoryName', () => {
  it('should split a category name into an object with emoji and text properties', () => {
    const categoryName = '🍕:Pizza';
    const expectedOutput = { emoji: '🍕', text: 'Pizza' };
    expect(splitCategoryName(categoryName)).toEqual(expectedOutput);
  });

  it('should handle category names with no emoji', () => {
    const categoryName = 'Burgers';
    const expectedOutput = { emoji: '', text: 'Burgers' };
    expect(splitCategoryName(categoryName)).toEqual(expectedOutput);
  });
});

describe('mergeCategoryName', () => {
  it('should merge the emoji and text', () => {
    const categoryName = { emoji: '🌟', text: 'Star' };
    const mergedName = mergeCategoryName(categoryName);
    expect(mergedName).toBe('🌟:Star');
  });

  it('should return only text if emoji is undefined', () => {
    const categoryName = { text: 'Star' };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mergedName = mergeCategoryName(categoryName);
    expect(mergedName).toBe('Star');
  });
});
