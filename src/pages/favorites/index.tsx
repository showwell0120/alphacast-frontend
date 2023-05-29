import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { Spinner } from 'react-bootstrap';

import { getEpisodes } from '../../apis/spotify';
import { EpisodeItem } from '../../components/episode-item';
import { EpisodePlayer } from '../../components/episode-player';
import { NoDataView } from '../../components/no-data-view';
import {
  useFavoriteContext,
  usePlayerContext,
  useUserContext,
} from '../../contexts';
import { LoggedInLayout } from '../../layouts/logged-in';
import styles from './styles.module.scss';

export function Favorites() {
  const { spotifyProfile } = useUserContext();
  const { episode } = usePlayerContext();
  const { favoriteEpisodeIds } = useFavoriteContext();

  const { data, isLoading, isError, error } = useQuery(
    ['getEpisodes', spotifyProfile?.country],
    () =>
      getEpisodes({
        country: spotifyProfile?.country,
        ids: favoriteEpisodeIds.map(show => show.id).join('%2C'),
      }),
    {
      enabled: favoriteEpisodeIds?.length ? true : false,
    }
  );

  // error handling: fallback rendering
  if (isError) {
    throw error;
  }

  return (
    <div className={styles['container']}>
      <LoggedInLayout>
        {!favoriteEpisodeIds?.length ? (
          <div
            className={classNames(
              styles['no-data'],
              episode && styles['has-player']
            )}
          >
            <NoDataView type={'favorite'} />
          </div>
        ) : (
          <>
            {isLoading ? (
              <Spinner
                animation="border"
                role="status"
                className={styles['spinner']}
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div
                className={classNames(
                  styles['episodes'],
                  episode && styles['has-player']
                )}
              >
                {data?.episodes.length &&
                  data?.episodes.map(episode => (
                    <EpisodeItem key={episode.id} episode={episode} />
                  ))}
              </div>
            )}
          </>
        )}
        {episode && (
          <div className={styles['player']}>
            <EpisodePlayer />
          </div>
        )}
      </LoggedInLayout>
    </div>
  );
}
