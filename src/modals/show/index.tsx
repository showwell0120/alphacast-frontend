import { ShowEpisodeList } from '../../components/show-episode-list';
import { ShowInfo, ShowInfoProps } from '../../components/show-info';
import { useCategoryContext, useModalContext } from '../../contexts';
import { Modal } from '../modal';
import styles from './styles.module.scss';

export function ShowModal(props: ShowInfoProps) {
  const { hideModal } = useModalContext();
  const { syncCategories } = useCategoryContext();

  const handleDeleteSuccess = () => {
    syncCategories({ onSettled: hideModal });
  };

  return (
    <Modal show={true} onClose={hideModal}>
      <ShowInfo {...props} onDeleteSuccess={handleDeleteSuccess} />
      <div className={styles['divider']}></div>
      <ShowEpisodeList id={props.id} />
    </Modal>
  );
}
