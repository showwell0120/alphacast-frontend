import classNames from 'classnames';
import Button from 'react-bootstrap/Button';

import { useModalContext } from '../../contexts';
import { modalTypes } from '../../contexts/modal/provider';
import styles from './styles.module.scss';

export interface ShowCardProps
  extends Pick<
    Spotify.Show,
    'id' | 'name' | 'publisher' | 'description' | 'images'
  > {
  categoryId: string;
  showMore?: boolean;
  selected?: boolean;
  onClick?: (id: string) => void;
}

export function ShowCard({
  categoryId,
  publisher,
  name,
  id,
  images,
  description,
  showMore = true,
  selected = false,
  onClick,
}: ShowCardProps) {
  const { showModal } = useModalContext();

  const handleOpenModal = () => {
    showModal(modalTypes.Show, {
      publisher,
      name,
      id,
      images,
      description,
      categoryId,
    });
  };

  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <div
      className={classNames(
        styles['container'],
        selected && styles['selected']
      )}
      onClick={handleClick}
    >
      <div className={styles['cover']}>
        <img src={images?.[0].url} alt={name} />
      </div>
      <div className={styles['name']}>{name}</div>
      <div className={styles['publisher']}>{publisher}</div>
      {showMore && (
        <Button
          variant="secondary"
          onClick={handleOpenModal}
          className={styles['more-btn']}
        >
          更多
        </Button>
      )}
    </div>
  );
}

export default ShowCard;
