export function splitCategoryName(categoryName: string): CategoryName {
  if (!categoryName.includes(':')) {
    return { emoji: '', text: categoryName };
  }
  const [emoji, text] = categoryName.split(':');
  return { emoji, text };
}

export function mergeCategoryName(categoryName: CategoryName): string {
  if (!categoryName.emoji) {
    return categoryName.text;
  }
  return Object.values(categoryName).join(':');
}
