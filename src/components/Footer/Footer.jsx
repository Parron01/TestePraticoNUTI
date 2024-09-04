import React from 'react';
import { FooterContainer, FooterText, FooterLink, FooterInfo } from './Footer.styles';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        Projeto desenvolvido por <FooterLink href="https://www.linkedin.com/in/andre-parron-45840a250/" target="_blank" rel="noopener noreferrer">Andre Parron Aranda</FooterLink>
        {' '}.
      </FooterText>
      <FooterInfo>© 2024 | Concluído em Agosto | <FooterLink href="https://github.com/Parron01/TestePraticoNUTI" target="_blank" rel="noopener noreferrer">Código GitHub</FooterLink></FooterInfo>
    </FooterContainer>
  );
};

export default Footer;
