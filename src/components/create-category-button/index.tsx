import { ReactComponent as PlusIcon } from '../../assets/plus.svg';
import { useModalContext } from '../../contexts';
import { modalTypes } from '../../contexts/modal/provider';
import styles from './styles.module.scss';

export function CreateCategoryButton() {
  const { showModal } = useModalContext();

  const handleOpenModal = () =>
    showModal(modalTypes.EditCategoryName, {
      title: '新增分類',
      categoryName: '',
      onSubmit: (success: boolean) => console.log(success),
    });

  return (
    <div className={styles['container']} onClick={handleOpenModal}>
      <PlusIcon />
      <span>新增分類</span>
    </div>
  );
}
