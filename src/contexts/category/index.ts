import { UseMutationResult } from '@tanstack/react-query';
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface SyncCategoriesEvents {
  onSettled: () => void;
}

export interface CategoryContextProps {
  categories: Server.Category[];
  currentCategoryId: string | null;
  setCategories: Dispatch<SetStateAction<Server.Category[]>>;
  setCurrentCategoryId: Dispatch<SetStateAction<string | null>>;
  syncCategories: (events?: SyncCategoriesEvents) => void;
  syncCategoriesMutation: UseMutationResult<
    Server.Categories,
    unknown,
    void,
    unknown
  > | null;
}

export const CategoryContext = createContext<CategoryContextProps>({
  categories: [],
  currentCategoryId: null,
  setCategories: () => null,
  setCurrentCategoryId: () => null,
  syncCategories: () => null,
  syncCategoriesMutation: null,
});

export const useCategoryContext = () => useContext(CategoryContext);

export { CategoryProvider } from './provider';
