import { useInfiniteQuery } from '@tanstack/react-query';
import Spinner from 'react-bootstrap/Spinner';

import { getShowEpisodes } from '../../apis/spotify';
import { EpisodeItem } from '../episode-item';
import styles from './styles.module.scss';

export function ShowEpisodeList(props: { id: string }) {
  // infinite scrolling
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      ['getShowEpisodes', props.id],
      ({ pageParam = 0 }) =>
        getShowEpisodes({ id: props.id, offset: pageParam }),
      {
        getNextPageParam: lastPage => {
          if (!lastPage.next) {
            return undefined;
          }
          return lastPage.offset + lastPage.limit;
        },
      }
    );

  const items = data?.pages.flatMap(page => page.items) ?? [];

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (Math.floor(scrollTop) + clientHeight === scrollHeight - 1) {
      if (!isLoading && !isFetchingNextPage && hasNextPage) {
        console.log('Scrolled to bottom!');
        fetchNextPage();
      }
    }
  };

  return (
    <div className={styles['episodes']} onScroll={handleScroll}>
      {isFetchingNextPage && <Spinner animation="border" />}
      {items.length &&
        items.map(episode => (
          <EpisodeItem key={episode.id} episode={episode} />
        ))}
    </div>
  );
}
