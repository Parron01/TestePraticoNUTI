import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderContainer, NavLinks, NavLink, AddConsultButton, Divider, HamburgerMenu, MobileNavLinks } from './Header.styles';
import { Plus, List } from 'phosphor-react';
import { useContratos } from '../../hooks/useContratos';
import { ConsultaModal } from '../ConsultaModal/ConsultaModal';

const Header = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const { handleOpenModal } = useContratos(); // Função para abrir o modal de consulta, obtida a partir do hook customizado
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar a visibilidade do menu mobile

  // Função para manipular o clique em um link de navegação
  const handleLinkClick = (href) => {
    navigate(href);
    setIsMenuOpen(false);
  };

  // Função para alternar a visibilidade do menu mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      {/* Ícone de menu hamburguer para telas mobile */}
      <HamburgerMenu onClick={toggleMenu}>
        <List size={32} />
      </HamburgerMenu>

      {/* Links de navegação para telas maiores */}
      <NavLinks>
        <NavLink onClick={() => handleLinkClick("/")}>Home</NavLink>
        <Divider />
        <NavLink onClick={() => handleLinkClick("/contratos")}>Contratos</NavLink>
        <Divider />
        <NavLink onClick={() => handleLinkClick("/historico-consultas")}>Histórico Consultas</NavLink>
      </NavLinks>

      {/* Botão para abrir o modal de consulta, visível apenas na rota de contratos */}
      {location.pathname === '/contratos' && (
        <AddConsultButton onClick={handleOpenModal}>
          Realizar Consulta <Plus size={20} weight="bold" />
        </AddConsultButton>
      )}

      {/* Menu mobile visível apenas quando o estado isMenuOpen for true */}
      {isMenuOpen && (
        <MobileNavLinks>
          <NavLink onClick={() => handleLinkClick("/")}>Home</NavLink>
          <NavLink onClick={() => handleLinkClick("/contratos")}>Contratos</NavLink>
          <NavLink onClick={() => handleLinkClick("/historico-consultas")}>Histórico Consultas</NavLink>
        </MobileNavLinks>
      )}

      {/* Componente de modal para realizar consultas */}
      <ConsultaModal />
    </HeaderContainer>
  );
};

export default Header;
