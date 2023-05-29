import { useMutation } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';

import { CategoryContext, SyncCategoriesEvents } from '.';
import { getCategories } from '../../apis/server';

export const CategoryProvider = (props: PropsWithChildren) => {
  const [categories, setCategories] = useState<Server.Category[]>([]);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(
    null
  );

  const syncCategoriesMutation = useMutation({ mutationFn: getCategories });

  // error handling: fallback rendering
  if (syncCategoriesMutation.isError) {
    throw syncCategoriesMutation.error;
  }

  const syncCategories = (events?: SyncCategoriesEvents) => {
    syncCategoriesMutation.mutate(undefined, {
      onSuccess: data => {
        setCategories(data.categories);
        data.categories.length &&
          !currentCategoryId &&
          setCurrentCategoryId(data.categories[0].id);
      },
      onSettled: () => {
        events?.onSettled();
      },
    });
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        currentCategoryId,
        setCategories,
        setCurrentCategoryId,
        syncCategories,
        syncCategoriesMutation,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
