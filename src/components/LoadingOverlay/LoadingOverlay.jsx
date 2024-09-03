import React from 'react';
import { LoadingMessage, LoadingOverlayWrapper, LoadingSpinnerOverlay } from './LoadingOverlay.styles';

const LoadingOverlay = ({ message }) => {
    return (
      <LoadingOverlayWrapper>
        <LoadingMessage>
          {message}
          <LoadingSpinnerOverlay />
        </LoadingMessage>
      </LoadingOverlayWrapper>
    );
  };
  

export default LoadingOverlay;
