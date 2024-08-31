import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${(props) => props.theme['gray-800']};
  padding: 0.75rem 1rem;
  text-align: center;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem; 
  margin-top: auto; 
`;

export const FooterText = styled.p`
  color: ${(props) => props.theme['gray-200']};
  margin: 0.25rem 0;
`;

export const FooterLink = styled.a`
  color: ${(props) => props.theme['blue-500']};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: ${(props) => props.theme['blue-300']};
    text-decoration: underline;
  }
`;

export const FooterInfo = styled.p`
  color: ${(props) => props.theme['gray-400']};
  margin-top: 0.25rem;
  font-size: 0.75rem; 
`;
