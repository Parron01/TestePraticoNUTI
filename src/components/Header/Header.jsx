import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderContainer, NavLinks, NavLink, AddConsultButton, Divider, HamburgerMenu, MobileNavLinks } from './Header.styles';
import { Plus, List } from 'phosphor-react';
import { useContratos } from '../../hooks/useContratos';
import { ConsultaModal } from '../ConsultaModal/ConsultaModal';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOpenModal } = useContratos();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (href) => {
    navigate(href);
    setIsMenuOpen(false); // Fecha o menu ao clicar em um link
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <HamburgerMenu onClick={toggleMenu}>
        <List size={32} />
      </HamburgerMenu>
      <NavLinks>
        <NavLink onClick={() => handleLinkClick("/")}>Home</NavLink>
        <Divider />
        <NavLink onClick={() => handleLinkClick("/contratos")}>Contratos</NavLink>
        <Divider />
        <NavLink onClick={() => handleLinkClick("/historico-consultas")}>Histórico Consultas</NavLink>
      </NavLinks>
      {location.pathname === '/contratos' && (
        <AddConsultButton onClick={handleOpenModal}>
          Realizar Consulta <Plus size={20} weight="bold" />
        </AddConsultButton>
      )}
      {isMenuOpen && (
        <MobileNavLinks>
          <NavLink onClick={() => handleLinkClick("/")}>Home</NavLink>
          <NavLink onClick={() => handleLinkClick("/contratos")}>Contratos</NavLink>
          <NavLink onClick={() => handleLinkClick("/historico-consultas")}>Histórico Consultas</NavLink>
        </MobileNavLinks>
      )}
      <ConsultaModal />
    </HeaderContainer>
  );
};

export default Header;
