import React, { FC } from 'react';

export interface IErrorMessage {
    message: string;
}

const ErrorMessage: FC<IErrorMessage> = ({ message }) => {
    return (
        <div className="error_message">
            {message}
        </div>
    );
};

export default ErrorMessage;