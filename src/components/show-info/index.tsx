import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import { deleteShow } from '../../apis/server';
import { shouldFallback } from '../../helpers/fallback';
import styles from './styles.module.scss';

export interface ShowInfoProps
  extends Pick<
    Spotify.Show,
    'id' | 'name' | 'publisher' | 'description' | 'images'
  > {
  categoryId: string;
  onDeleteSuccess: (data: Server.SuccessResponse) => void;
}

export function ShowInfo({
  name,
  publisher,
  description,
  images,
  id,
  categoryId,
  onDeleteSuccess,
}: ShowInfoProps) {
  const _deleteShow = useMutation({ mutationFn: deleteShow });

  // error handling: fallback rendering or other actions
  if (_deleteShow.isError) {
    const error = _deleteShow.error as AxiosError;
    if (shouldFallback(error)) {
      throw error;
    } else if (error?.response?.status === 409) {
      toast('此分類已不存在');
    }
  }

  const handleDelete = () => {
    _deleteShow.mutate(
      { showId: id, categoryId },
      {
        onSuccess: onDeleteSuccess,
      }
    );
  };

  return (
    <div className={styles['show-info']}>
      <div className={styles['cover']}>
        <img src={images?.[0].url} alt={name} />
      </div>
      <div className={styles['texts']}>
        <div className={styles['name']}>{name}</div>
        <div className={styles['publisher']}>{publisher}</div>
        <div className={styles['description']}>{description}</div>
        <div className={styles['delete-btn']}>
          <Button
            size="sm"
            variant="outline-primary"
            onClick={handleDelete}
            disabled={_deleteShow.isLoading}
          >
            {_deleteShow.isLoading ? <span>刪除中</span> : <span>刪除</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}
