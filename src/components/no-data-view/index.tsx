import classNames from 'classnames';
import Button from 'react-bootstrap/Button';

import { ReactComponent as EmptyFolderIcon } from '../../assets/empty-folder.svg';
import { flexColCenter } from '../../bootstrap/classnames';
import styles from './styles.module.scss';

export interface NoDataViewProps {
  type: 'category' | 'show' | 'favorite';
  onClick?: () => void;
}

const title = {
  category: '您尚未新增任何分類，可以點擊左方按鈕新增！',
  show: '您尚未加入任何節目，可以點擊下方按鈕新增！',
  favorite: '您尚未新增任何收藏，可以前往單集資訊新增！',
};

const button = {
  show: '新增節目',
  category: '新增分類',
  favorite: '前往主頁',
};

export function NoDataView({ type, onClick }: NoDataViewProps) {
  return (
    <div className={classNames(flexColCenter, styles['container'])}>
      <EmptyFolderIcon height={56} width={56} />
      <div>{title[type]}</div>
      {onClick && (
        <Button
          variant="primary"
          className={styles['button']}
          onClick={onClick}
        >
          {button[type]}
        </Button>
      )}
    </div>
  );
}
