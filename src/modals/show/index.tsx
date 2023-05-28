import { ShowEpisodeList } from '../../components/show-episode-list';
import { ShowInfo, ShowInfoProps } from '../../components/show-info';
import { useModalContext } from '../../contexts';
import { Modal } from '../modal';
import styles from './styles.module.scss';

export function ShowModal(props: ShowInfoProps) {
  const { hideModal } = useModalContext();

  return (
    <Modal show={true} onClose={hideModal}>
      <ShowInfo {...props} />
      <div className={styles['divider']}></div>
      <ShowEpisodeList id={props.id} />
    </Modal>
  );
}
