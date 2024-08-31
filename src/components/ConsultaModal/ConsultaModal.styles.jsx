import styled from "styled-components";

export const ConsultaModalContainer = styled.form`
  h1 {
    margin-bottom: 1rem;
    color: ${(props) => props.theme["gray-100"]}; 
  }
  
  input {
    display: flex;
    width: 100%;
    margin: 1rem 0;
    padding: 1rem;
    background: ${(props) => props.theme["gray-200"]}; 
    color: ${(props) => props.theme["gray-500"]}; 
    border-radius: 0.75rem;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2); 
    border: 1px solid ${(props) => props.theme["gray-100"]}; 
  }
  
  label {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    color: ${(props) => props.theme["gray-300"]}; 
  }
`;

export const SendButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${(props) => props.theme["blue-600"]}; 
  color: ${(props) => props.theme["white"]}; 
  border: ${(props) => props.theme["blue-500"]};
  border-radius: 0.5rem; 
  font-size: 1.3rem;
  margin-top: 1.5rem;
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transition: color 0.3s ease;
    color: ${(props) => props.theme["white"]};
    transition: background-color 0.3s ease;
    background-color: ${(props) => props.theme["blue-500"]};
  }
`;
