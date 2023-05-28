import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import { searchShows } from '../../apis/spotify';
import { useUserContext } from '../../contexts';
import SearchInput from '../search-input';
import ShowCard from '../show-card';
import styles from './styles.module.scss';

export interface SearchShowProps {
  onSelectShow: (id: string) => void;
  showId: string;
  categoryId: string;
}

export function SearchShow({
  showId,
  onSelectShow,
  categoryId,
}: SearchShowProps) {
  const { spotifyProfile } = useUserContext();

  const [keyword, setKeyword] = useState('');

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation({
    mutationFn: searchShows,
  });

  // error handling: fallback rendering
  if (isError) {
    throw error;
  }

  useEffect(() => {
    keyword.length &&
      mutate({
        keyword,
        ...(spotifyProfile?.country && { country: spotifyProfile?.country }),
      });
  }, [mutate, keyword, spotifyProfile]);

  return (
    <div className={styles['container']}>
      <SearchInput value={keyword} onChange={setKeyword} />
      {isLoading && (
        <Spinner animation="border" role="status" className={styles['spinner']}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {isSuccess && data.shows.items?.length && (
        <>
          <div className={styles['search-title']}>搜尋結果</div>
          <div className={styles['shows-wrapper']}>
            {data.shows.items.map(item => (
              <ShowCard
                key={`${item.id}`}
                publisher={item.publisher}
                name={item.name}
                id={item.id}
                images={item.images}
                showMore={false}
                selected={showId === item.id}
                categoryId={categoryId}
                description={item.description}
                onClick={onSelectShow}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
