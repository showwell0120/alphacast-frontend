import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface FavoriteContextProps {
  favoriteEpisodeIds: Server.Favorite[];
  setFavoriteEpisodeIds: Dispatch<SetStateAction<Server.Favorite[]>>;
}

export const FavoriteContext = createContext<FavoriteContextProps>({
  favoriteEpisodeIds: [],
  setFavoriteEpisodeIds: () => [],
});

export const useFavoriteContext = () => useContext(FavoriteContext);
