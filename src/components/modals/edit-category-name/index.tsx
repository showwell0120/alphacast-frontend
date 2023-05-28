import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

import { createCategory, updateCategory } from '../../../apis/server';
import { useCategoryContext } from '../../../contexts';
import { useModalContext } from '../../../contexts/modal';
import {
  mergeCategoryName,
  splitCategoryName,
} from '../../../helpers/categoryName';
import { shouldFallback } from '../../../helpers/fallback';
import { EditCategoryName } from '../../edit-category-name';
import { Modal } from '../modal';
import styles from './styles.module.scss';

export interface EditCategoryNameModalProps {
  title: string;
  categoryName: string;
  onSubmit: (success: boolean) => void;
  id?: string;
}

export function EditCategoryNameModal(props: EditCategoryNameModalProps) {
  const [categoryName, setCategoryName] = useState<CategoryName>(
    splitCategoryName(props.categoryName)
  );

  const { hideModal } = useModalContext();
  const { syncCategories, syncCategoriesMutation } = useCategoryContext();

  const _createCategory = useMutation({ mutationFn: createCategory });
  const _updateCategory = useMutation({ mutationFn: updateCategory });

  // error handling: fallback rendering or other actions
  if (_createCategory.isError) {
    const error = _createCategory.error as AxiosError;
    if (shouldFallback(error)) {
      throw error;
    } else if (error?.response?.status === 409) {
      toast('已存在相同名稱的分類');
    }
  }

  // error handling: fallback rendering or other actions
  if (_updateCategory.isError) {
    const error = _updateCategory.error as AxiosError;
    if (shouldFallback(error)) {
      throw error;
    } else if (error?.response?.status === 409) {
      toast('已存在相同名稱的分類');
    }
  }

  const handleChange = (value: string, field: keyof CategoryName) =>
    setCategoryName(prevState => ({ ...prevState, [field]: value }));

  const updateNameCallback = {
    onSuccess: (data: Server.SuccessResponse) => {
      syncCategories({ onSettled: hideModal });
      props.onSubmit(data.success);
    },
  };

  const handleSave = async () => {
    const finalName = mergeCategoryName(categoryName);
    props?.id
      ? _updateCategory.mutate(
          { name: finalName, id: props.id },
          updateNameCallback
        )
      : _createCategory.mutate(finalName, updateNameCallback);
  };

  const buttons = [
    {
      variant: 'none',
      children: '取消',
      onClick: hideModal,
    },
    {
      variant: 'primary',
      children: '儲存',
      onClick: handleSave,
    },
  ];

  return (
    <Modal
      title={props.title}
      show={true}
      buttonProps={buttons}
      onClose={hideModal}
    >
      <div className={styles['modal-container']}>
        {_createCategory.isLoading || syncCategoriesMutation?.isLoading ? (
          <Spinner
            animation="border"
            role="status"
            className={styles['spinner']}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <EditCategoryName
            categoryName={categoryName}
            onChange={handleChange}
          />
        )}
      </div>
    </Modal>
  );
}
