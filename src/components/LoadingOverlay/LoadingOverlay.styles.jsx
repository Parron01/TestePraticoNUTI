import styled from 'styled-components';

export const LoadingOverlayWrapper = styled.div`
  position: fixed;
  top: 6rem; 
  left: 0;
  width: 100%;
  height: calc(100vh - 4rem); 
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;

  
  @media (max-width: 768px) {
    top: 6rem; 
    height: calc(100vh - 10rem); 
  }
`;

export const LoadingMessage = styled.div`
  color: #fff;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 1rem;

  
  @media (max-width: 768px) {
    font-size: 1rem; 
  }
`;

export const LoadingSpinnerOverlay = styled.div`
  margin-left: 0.75rem; 
  border: 4px solid rgba(255, 255, 255, 0.3);
  width: 48px;  
  height: 48px; 
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  
  @media (max-width: 768px) {
    width: 36px;  
    height: 36px; 
  }
`;