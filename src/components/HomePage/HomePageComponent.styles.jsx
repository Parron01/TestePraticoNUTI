import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
`;

export const Content = styled.div`
  text-align: center;
  background: white;
  padding: 1.25rem; 
  border-radius: 0.625rem; 
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1); 
  max-width: 31.25rem; 
  width: 100%;
`;

export const Header = styled.header`
  margin-bottom: 1.25rem; 
`;

export const Title = styled.h1`
  color: #007bff;
  font-size: 1.5rem; 
  margin: 1rem 0;
`;

export const Subtitle = styled.p`
  font-size: 1rem; 
  color: #666;
`;

export const MainContent = styled.main`
  margin: 1.25rem 0; 
`;

export const ConsultButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem; 
  font-size: 1.125rem; 
  border-radius: 0.3125rem; 
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Footer = styled.footer`
  margin-top: 1.25rem; 
  font-size: 0.875rem; 
  color: #999;
`;
