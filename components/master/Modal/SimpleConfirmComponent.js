import React from 'react';
import { Spinner } from 'react-bootstrap';
import SimpleBtn from '../SimpleBtn/SimpleBtn';

/**
 * @since 1.0.0
 * @param confirmClick //function for confirm activity
 * @param closeModal, //function for close modal
 * @param isLoading, // boolean true or false
 * @param text //string
 * @param details nullable
 * @param confirmBtnVariant //string background color for confirm button
 * @param closeBtnVariant //string background color for close button
 *
 * @returns SimpleConfirmComponent
 */

const SimpleConfirmComponent = ({ text, details = "N/A", closeModal, confirmClick, isLoading = false, confirmBtnVariant, closeBtnVariant }) => {

    return (
        <div className="simple_confirm_com">
            <p className="simple_confirm_message">{text}</p>
            <div>
                <SimpleBtn variant={closeBtnVariant} style={{ width: 'fit-content' }} onClick={closeModal}>
                    Cancel
                </SimpleBtn>
                {
                    !isLoading && (
                        <SimpleBtn variant={confirmBtnVariant} style={{ width: 'fit-content', marginLeft: "15px" }} onClick={confirmClick}>
                            Confirm
                        </SimpleBtn>
                    )
                }
                {
                    isLoading && (
                        <SimpleBtn variant={confirmBtnVariant} style={{ width: 'fit-content', marginLeft: "15px" }} onClick={confirmClick}>
                            <Spinner animation="border" size="sm" />
                             <span className="ml-2">Submitting...</span>
                        </SimpleBtn>
                    )
                }

            </div>
        </div>
    );
};

export default SimpleConfirmComponent;