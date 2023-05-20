// 將分類名稱的字串分割 emoji 跟 text
export function splitCategoryName(categoryName: string): CategoryName {
  if (!categoryName.includes(':')) {
    return { emoji: '', text: categoryName };
  }
  const [emoji, text] = categoryName.split(':');
  return { emoji, text };
}

// 將 emoji 跟 text 合併為純字串
export function mergeCategoryName(categoryName: CategoryName): string {
  if (!categoryName.emoji) {
    return categoryName.text;
  }
  return Object.values(categoryName).join(':');
}
