import React, { FC } from "react";

export interface ILoadingSpinner {
  text: string;
}

const LoadingSpinner: FC<ILoadingSpinner> = ({ text }) => {
  return (
    <div className="loading_component">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      {text !== "" && text.length > 0 && <p>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
