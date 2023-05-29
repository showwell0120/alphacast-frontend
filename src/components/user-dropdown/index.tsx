import { MouseEvent, ReactNode, forwardRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { ReactComponent as DownIcon } from '../../assets/chevron-down.svg';
import { useUserContext } from '../../contexts';
import { Image } from '../image';
import styles from './styles.module.scss';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    onClick: (e: MouseEvent<HTMLDivElement>) => void;
  }
>(({ children, onClick }, ref) => (
  <div
    className={styles['wrapper']}
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <DownIcon />
  </div>
));

export function UserDropdown() {
  const { spotifyProfile } = useUserContext();

  if (!spotifyProfile) {
    return null;
  }

  const handleNavigate = () => {
    //
  };

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <div>
          <Image
            fallbackSrc="./images/avatar-placeholder.png"
            className={styles['avatar']}
            src={spotifyProfile?.images?.[0]?.url ?? ''}
            alt={spotifyProfile.display_name}
          />
          <span>{spotifyProfile.display_name}</span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleNavigate}>查看我的個人資訊</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
