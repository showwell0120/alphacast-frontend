/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, useState } from 'react';

import { ModalContext, ModalStore, initialStore } from '.';
import {
  EditCategoryNameModal,
  RemoveCategoryPrompt,
} from '../../components/modals';

const modalTypes = {
  EditCategoryName: Symbol('EditCategoryName'),
  RemoveCategoryPrompt: Symbol('RemoveCategoryPrompt'),
  ShowFinder: Symbol('ShowFinder'),
  EpisodesOfShow: Symbol('EpisodesOfShow'),
};

const modalComponents = {
  [modalTypes.EditCategoryName]: EditCategoryNameModal,
  [modalTypes.RemoveCategoryPrompt]: RemoveCategoryPrompt,
};

export const ModalProvider = (props: PropsWithChildren) => {
  const [store, setStore] = useState<ModalStore>({ ...initialStore });

  const showModal = (modalType: symbol, modalProps: any = {}) => {
    setStore({
      ...store,
      modalType,
      modalProps,
    });
  };

  const hideModal = () => {
    setStore({
      ...store,
      ...initialStore,
    });
  };
  const renderComponent = () => {
    const { modalType, modalProps } = store;
    const ModalComponent = modalType ? modalComponents[modalType] : null;
    if (!ModalComponent) {
      return null;
    }
    return <ModalComponent {...modalProps} />;
  };

  return (
    <ModalContext.Provider
      value={{
        store,
        showModal,
        hideModal,
      }}
    >
      {renderComponent()}
      {props.children}
    </ModalContext.Provider>
  );
};
