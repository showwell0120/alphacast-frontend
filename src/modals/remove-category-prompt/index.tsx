import { useMutation } from '@tanstack/react-query';
import { Emoji } from 'emoji-picker-react';
import Spinner from 'react-bootstrap/Spinner';

import { deleteCategory } from '../../apis/server';
import { useCategoryContext, useModalContext } from '../../contexts';
import { splitCategoryName } from '../../helpers/categoryName';
import { Modal } from '../modal';
import styles from './styles.module.scss';

export interface RemoveCategoryPromptProps {
  id: string;
  categoryName: string;
  onDelete: (success: boolean) => void;
}

export function RemoveCategoryPrompt({
  id,
  categoryName,
  onDelete,
}: RemoveCategoryPromptProps) {
  const { hideModal } = useModalContext();
  const {
    syncCategories,
    syncCategoriesMutation,
    setCurrentCategoryId,
    categories,
  } = useCategoryContext();

  const name = splitCategoryName(categoryName);

  const _deleteCategory = useMutation({ mutationFn: deleteCategory });

  // error handling: fallback rendering
  if (_deleteCategory.isError) {
    throw _deleteCategory.error;
  }

  const handleDelete = () => {
    _deleteCategory.mutate(id, {
      onSuccess: (data: Server.SuccessResponse) => {
        syncCategories({
          onSettled: () => {
            setCurrentCategoryId(categories?.[0].id && null);
            hideModal();
          },
        });
        onDelete(data.success);
      },
    });
  };

  const buttons = [
    {
      variant: 'none',
      children: '取消',
      onClick: hideModal,
    },
    {
      variant: 'primary',
      children: '刪除',
      onClick: handleDelete,
    },
  ];

  return (
    <Modal
      title="刪除分類"
      show={true}
      buttonProps={buttons}
      onClose={hideModal}
    >
      <div className={styles['modal-container']}>
        {_deleteCategory.isLoading || syncCategoriesMutation?.isLoading ? (
          <Spinner
            animation="border"
            role="status"
            className={styles['spinner']}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <span>
            您確定要繼續刪除&nbsp;
            <Emoji unified={name.emoji} size={24} />
            &nbsp;<span className={styles['text']}>{name.text}</span>
            &nbsp;分類嗎？
          </span>
        )}
      </div>
    </Modal>
  );
}

export default RemoveCategoryPrompt;
