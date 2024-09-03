import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${(props) =>
    props.theme["gray-600"]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  height: 6rem;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 1rem 1rem;
  }
`;

export const NavLinks = styled.nav`
  margin: 0 5rem;
  display: flex;
  gap: 3rem;

  @media (max-width: 768px) {
    display: none; 
  }
`;

export const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 6rem; 
  left: 1rem; 
  background-color: ${(props) => props.theme["gray-600"]};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  gap: 1rem;
  z-index: 1000;

  @media (min-width: 769px) {
    display: none; 
  }
`;

export const NavLink = styled.div`
  color: ${(props) => props.theme["gray-200"]};
  font-size: 1.25rem;
  padding: 0.75rem;
  height: 3rem;
  border-radius: 0.5rem;
  transition: color 0.4s ease;
  font-weight:600;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme["white"]};
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 3rem;
  align-content: center;
  background-color: ${(props) => props.theme["gray-500"]};

  @media (max-width: 768px) {
    display: none; 
  }
`;

export const AddConsultButton = styled.button`
  background-color: ${(props) => props.theme["blue-600"]};
  color: ${(props) => props.theme["gray-100"]};

  border: ${(props) => props.theme["blue-500"]};
  border-radius: 0.3125rem;

  padding: 1rem 2rem;
  font-size: 1.125rem;
  margin-right: 5rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transition: color 0.3s ease;
    color: ${(props) => props.theme["white"]};
    transition: background-color 0.3s ease;
    background-color: ${(props) => props.theme["blue-500"]};
  }

  @media (max-width: 768px) {
    margin-left: auto; 
  }
`;

export const HamburgerMenu = styled.div`
  display: none;
  color: ${(props) => props.theme["white"]};
  cursor: pointer;

  @media (max-width: 768px) {
    display: block; 
  }
`;
