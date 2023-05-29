import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { Modal as BootstrapModal, Button, ButtonProps } from 'react-bootstrap';

export interface ModalProps extends PropsWithChildren {
  show: boolean;
  onClose: () => void;
  title?: string;
  buttonProps?: ButtonProps[];
}

export function Modal({
  show,
  onClose,
  title = '',
  buttonProps = [],
  children,
}: ModalProps) {
  return (
    <BootstrapModal
      show={show}
      onHide={onClose}
      size="lg"
      dialogClassName={classNames(
        'modal-container',
        !title?.length && 'no-title'
      )}
      centered
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{children}</BootstrapModal.Body>
      {buttonProps?.length ? (
        <BootstrapModal.Footer>
          {buttonProps?.map((props, index) => (
            <Button
              key={`modal-button-${index}`}
              {...props}
              style={{ width: 200 }}
            >
              {props.children}
            </Button>
          ))}
        </BootstrapModal.Footer>
      ) : null}
    </BootstrapModal>
  );
}
