import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

import { addShow } from '../../apis/server';
import { SearchShow } from '../../components/search-show';
import { useCategoryContext, useModalContext } from '../../contexts';
import { shouldFallback } from '../../helpers/fallback';
import { Modal } from '../modal';
import styles from './styles.module.scss';

export interface SearchShowModalProps {
  categoryId: string;
  onSubmit: (success: boolean) => void;
}

export function SearchShowModal({
  categoryId,
  onSubmit,
}: SearchShowModalProps) {
  const { hideModal } = useModalContext();
  const { syncCategories } = useCategoryContext();

  const [showId, setShowId] = useState('');

  const _addShow = useMutation({ mutationFn: addShow });

  // error handling: fallback rendering or other actions
  if (_addShow.isError) {
    const error = _addShow.error as AxiosError;
    if (shouldFallback(error)) {
      throw error;
    } else if (error?.response?.status === 409) {
      toast('此節目已加入分類中');
      hideModal();
    }
  }

  const handleSumbit = () => {
    _addShow.mutate(
      { categoryId, showId },
      {
        onSuccess: (data: Server.SuccessResponse) => {
          syncCategories({ onSettled: hideModal });
          onSubmit(data.success);
        },
      }
    );
  };

  const buttons = [
    {
      variant: 'none',
      children: '取消',
      onClick: hideModal,
    },
    {
      variant: 'primary',
      children: '確定新增',
      disabled: showId === '',
      onClick: handleSumbit,
    },
  ];

  return (
    <Modal
      title="新增節目"
      show={true}
      buttonProps={buttons}
      onClose={hideModal}
    >
      <div className={styles['modal-container']}>
        {_addShow.isLoading ? (
          <Spinner
            animation="border"
            role="status"
            className={styles['spinner']}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <SearchShow
            onSelectShow={setShowId}
            showId={showId}
            categoryId={categoryId}
          />
        )}
      </div>
    </Modal>
  );
}
