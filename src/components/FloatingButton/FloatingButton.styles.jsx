import styled from "styled-components";

export const FloatingButtonContainer = styled.a`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: ${props => props.theme["gray-700"]};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  text-decoration: none;
  border: 1px solid ${props => props.theme["gray-500"]};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    border: 1px solid ${props => props.theme["gray-500"]};
  }

  &:active {
    transform: translateY(0);
  }
`;