import classNames from 'classnames';
import { Emoji } from 'emoji-picker-react';
import { MouseEvent, ReactNode, forwardRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as MoreVertIcon } from '../../assets/more-vert.svg';
import { useCategoryContext, useModalContext } from '../../contexts';
import { modalTypes } from '../../contexts/modal/provider';
import { splitCategoryName } from '../../helpers/categoryName';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    onClick: (e: MouseEvent<HTMLDivElement>) => void;
  }
>(({ onClick }, ref) => (
  <div
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <MoreVertIcon width={20} height={20} />
  </div>
));

export function CategoryItem({ id, name }: Server.Category) {
  const { currentCategoryId, setCurrentCategoryId } = useCategoryContext();
  const { showModal } = useModalContext();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isFavPath = pathname.includes('/favorites');

  const categoryName = splitCategoryName(name);

  const handleEditName = () => {
    showModal(modalTypes.EditCategoryName, {
      id,
      title: '編輯分類名稱',
      categoryName: name,
      onSubmit: (success: boolean) => console.log(success),
    });
  };

  const handleDeleteCategory = () => {
    showModal(modalTypes.RemoveCategoryPrompt, {
      id,
      categoryName: name,
      onDelete: (success: boolean) => console.log(success),
    });
  };

  const handleAddShow = () => {
    showModal(modalTypes.Show, {
      categoryId: id,
      onSubmit: (success: boolean) => console.log(success),
    });
  };

  const handleChangeCurrCategory = () => {
    setCurrentCategoryId(id);
    if (isFavPath) {
      navigate('/main');
    }
  };

  return (
    <div
      className={classNames(
        'category-item',
        currentCategoryId === id && 'active'
      )}
      onClick={handleChangeCurrCategory}
    >
      <div className={'name'}>
        <Emoji unified={categoryName.emoji || '1f423'} size={20} />
        <div className={'text'}>{categoryName.text}</div>
      </div>
      <Dropdown drop="down-centered">
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleEditName}>編輯名稱</Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteCategory}>刪除分類</Dropdown.Item>
          <Dropdown.Item onClick={handleAddShow}>新增節目</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
