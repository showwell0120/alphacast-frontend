import { PropsWithChildren, useState } from 'react';

import { FavoriteContext } from '.';

export const FavoriteProvider = (props: PropsWithChildren) => {
  const [favoriteEpisodeIds, setFavoriteEpisodeIds] = useState<
    Server.Favorite[]
  >([]);

  return (
    <FavoriteContext.Provider
      value={{
        favoriteEpisodeIds,
        setFavoriteEpisodeIds,
      }}
    >
      {props.children}
    </FavoriteContext.Provider>
  );
};
