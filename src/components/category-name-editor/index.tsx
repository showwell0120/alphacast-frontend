import classNames from 'classnames';
import EmojiPicker, { Emoji, EmojiClickData } from 'emoji-picker-react';
import { ChangeEvent, useState } from 'react';

import styles from './styles.module.scss';

export interface CategoryNameEditorProps {
  categoryName: CategoryName;
  onChange: (value: string, field: keyof CategoryName) => void;
}

export function CategoryNameEditor(props: CategoryNameEditorProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiChange = (emojiData: EmojiClickData) => {
    props.onChange(emojiData.unified, 'emoji');
    setShowEmojiPicker(false);
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value, 'text');
  };

  return (
    <div className={styles['input-container']}>
      <div
        className="position-relative"
        onClick={() => setShowEmojiPicker(preState => !preState)}
      >
        <div className={styles['emoji-wrapper']}>
          <Emoji unified={props.categoryName.emoji || '1f423'} size={24} />
        </div>
        <div
          className={classNames('position-absolute', styles['emoji-picker'])}
        >
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiClick={handleEmojiChange}
              searchDisabled
              skinTonesDisabled
              height={240}
              previewConfig={{ showPreview: false }}
            />
          )}
        </div>
      </div>
      <input
        type="text"
        className="text-input"
        placeholder="請輸入分類名稱（前方可變更 emoji）"
        value={props.categoryName.text}
        onChange={handleTextChange}
      />
    </div>
  );
}
