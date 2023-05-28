import { useCategoryContext } from '../../contexts';
import { CategoryItem } from '../category-item';

export function CategoryMenu() {
  const { categories } = useCategoryContext();

  if (!categories?.length) {
    return null;
  }

  return (
    <div>
      {categories.map(category => (
        <CategoryItem key={`${category.id}`} {...category} />
      ))}
    </div>
  );
}
