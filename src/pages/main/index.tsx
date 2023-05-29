import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import Spinner from 'react-bootstrap/Spinner';

import { getShows } from '../../apis/spotify';
import { EpisodePlayer } from '../../components/episode-player';
import { NoDataView } from '../../components/no-data-view';
import ShowCard from '../../components/show-card';
import {
  useCategoryContext,
  useModalContext,
  usePlayerContext,
  useUserContext,
} from '../../contexts';
import { modalTypes } from '../../contexts/modal/provider';
import { LoggedInLayout } from '../../layouts/logged-in';
import styles from './styles.module.scss';

export function Main() {
  const { currentCategoryId, categories } = useCategoryContext();
  const { spotifyProfile } = useUserContext();
  const { showModal } = useModalContext();
  const { episode } = usePlayerContext();

  console.log(episode);

  const currentCategory = categories.find(c => c.id === currentCategoryId);

  const { data, isLoading, isError, error } = useQuery(
    ['getShows', spotifyProfile?.country, currentCategory],
    () =>
      getShows({
        country: spotifyProfile?.country,
        ids: currentCategory?.savedShows.map(show => show.id).join('%2C'),
      }),
    {
      enabled: currentCategory?.savedShows?.length ? true : false,
    }
  );

  // error handling: fallback rendering
  if (isError) {
    throw error;
  }

  const handleAddShow = () => {
    showModal(modalTypes.SearchShow, {
      categoryId: currentCategoryId,
      onSubmit: (success: boolean) => console.log(success),
    });
  };

  return (
    <LoggedInLayout>
      <div className={styles['container']}>
        {!currentCategoryId ? (
          <div
            className={classNames(
              styles['no-data'],
              episode && styles['has-player']
            )}
          >
            <NoDataView type={'category'} />
          </div>
        ) : !currentCategory?.savedShows?.length ? (
          <div
            className={classNames(
              styles['no-data'],
              episode && styles['has-player']
            )}
          >
            <NoDataView type={'show'} onClick={handleAddShow} />
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
              <div className={styles['main']}>
                <div
                  className={classNames(
                    styles['shows-wrapper'],
                    episode && styles['has-player']
                  )}
                >
                  {data?.shows.map(item => (
                    <ShowCard
                      key={`${item.id}`}
                      publisher={item.publisher}
                      name={item.name}
                      id={item.id}
                      images={item.images}
                      description={item.description}
                      categoryId={currentCategoryId}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        {episode && (
          <div className={styles['player']}>
            <EpisodePlayer />
          </div>
        )}
      </div>
    </LoggedInLayout>
  );
}
