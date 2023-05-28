import { AxiosError } from 'axios';
import classNames from 'classnames';
import Button from 'react-bootstrap/Button';

import { flexColCenter } from '../../bootstrap/classnames';
import styles from './styles.module.scss';

export interface FallbackProps {
  error: AxiosError;
}

const messageMap = {
  needAuth: '帳號認證已經超過效期，請點選下方按鈕重新登入。',
  serverError: '系統出現內部錯誤，請聯繫客服人員。',
};
export function Fallback({ error }: FallbackProps) {
  const status = error.response?.status;

  const isNeedAuth = (status && status === 401) || status === 403;
  const isServerError = status && status >= 500;
  const message = isServerError
    ? messageMap.serverError
    : isNeedAuth
    ? messageMap.needAuth
    : '發生未知錯誤，請點選下方按鈕重新登入。';

  return (
    <div className={classNames(flexColCenter, styles['container'])}>
      <p>{message}</p>
      <pre>({error.message})</pre>
      <Button
        onClick={() => {
          window.location.href = window.location.origin;
        }}
      >
        登入
      </Button>
    </div>
  );
}
