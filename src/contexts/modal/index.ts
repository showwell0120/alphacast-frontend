/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';

export type ModalStore = {
  modalType: symbol | null;
  modalProps?: any;
};

export const initialStore: ModalStore = {
  modalType: null,
  modalProps: null,
};

export interface ModalContextProps {
  showModal: (modalType: symbol, modalProps?: any) => void;
  hideModal: () => void;
  store: ModalStore;
}

export const ModalContext = createContext<ModalContextProps>({
  showModal: () => null,
  hideModal: () => null,
  store: { ...initialStore },
});

export const useModalContext = () => useContext(ModalContext);

export { ModalProvider } from './provider';
