import React, { FC } from 'react';
import Modal from 'react-bootstrap/Modal';

export interface ISimpleModalProps {
    show: boolean;
    handleClose: Function;
    size?: 'sm' | 'lg' | 'xl';
}

const SimpleModal: FC<ISimpleModalProps> = (props) => {

    const { show, handleClose, size } = props;
    const modalSize = (typeof size !== 'undefined' && size !== null) ? size : 'lg';

    return (
        <Modal
            onClose={handleClose}
            size={modalSize}
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="modal_close_btn">
                    <span onClick={() => handleClose()} >
                        <i className="fas fa-times"></i>
                    </span>
                </div>
                {props.children}
            </Modal.Body>
        </Modal>
    );
}

export default SimpleModal;