import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

import { addFavorite, removeFavorite } from '../../apis/server';
import { ReactComponent as SavedFavIcon } from '../../assets/bookmark-fill.svg';
import { ReactComponent as FavIcon } from '../../assets/bookmark-outline.svg';
import { useFavoriteContext } from '../../contexts';
import { shouldFallback } from '../../helpers/fallback';
import styles from './styles.module.scss';

export interface FavoriteButtonProps {
  episodeId: string;
}

export function FavoriteButton({ episodeId }: FavoriteButtonProps) {
  const { favoriteEpisodeIds, setFavoriteEpisodeIds } = useFavoriteContext();

  const _addFavorite = useMutation({ mutationFn: addFavorite });
  const _removeFavorite = useMutation({ mutationFn: removeFavorite });

  // error handling: fallback rendering or other actions
  if (_addFavorite.isError) {
    const error = _addFavorite.error as AxiosError;
    if (shouldFallback(error)) {
      throw error;
    } else if (error?.response?.status === 409) {
      toast('您已經將此單集加入收藏');
    }
  }

  if (_removeFavorite.isError) {
    const error = _addFavorite.error as AxiosError;
    if (shouldFallback(_removeFavorite.error as AxiosError)) {
      throw _removeFavorite.error;
    } else if (error?.response?.status === 404) {
      toast('您並未將此單集加入收藏');
    }
  }

  const isLoading = _addFavorite.isLoading || _removeFavorite.isLoading;

  const isSaved = favoriteEpisodeIds.findIndex(f => f.id === episodeId) > -1;

  const handleAddFavorite = () => {
    _addFavorite.mutate(episodeId, {
      onSuccess(data: Server.SuccessResponse) {
        data.success &&
          setFavoriteEpisodeIds([...favoriteEpisodeIds, { id: episodeId }]);
      },
    });
  };

  const handleRemoveFavorite = () => {
    _removeFavorite.mutate(episodeId, {
      onSuccess(data: Server.SuccessResponse) {
        data.success &&
          setFavoriteEpisodeIds(
            favoriteEpisodeIds.filter(f => f.id !== episodeId)
          );
      },
    });
  };

  return (
    <div
      className={styles['fav']}
      onClick={isSaved ? handleRemoveFavorite : handleAddFavorite}
    >
      {isLoading ? (
        <Spinner animation="border" size="sm" />
      ) : isSaved ? (
        <SavedFavIcon />
      ) : (
        <FavIcon />
      )}
    </div>
  );
}
