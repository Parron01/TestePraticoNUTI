import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
}
body, html {
    height: 100%;
    background-color: ${props => props.theme["gray-100"]};
  }

  body {
    display: flex;
    flex-direction: column;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

button{
    cursor: pointer;
}

a{
    color: inherit;
    text-decoration: none;
}


@media (max-width: 1080px){
    html{
        font-size: 93.75%;
    }
}
@media (max-width: 720px){
    html{
        font-size: 87.5%;
    }
}


.react-modal-overlay {
    background-color: rgba(0, 0, 0, 0.7); 

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
}

.react-modal-content {
    width: 100%;
    max-width: 36rem;
    background-color: ${props => props.theme["gray-700"]}; 
    padding: 3rem;
    position: relative;
    border-radius: 0.5rem; 
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25); 
}

.react-modal-close {
    position: absolute;
    right: 1.2rem;
    top: 1.2rem;
    border: 0;
    background: transparent;

    color: ${props => props.theme["gray-500"]}; 

    transition: filter 0.2s;
    &:hover {
        filter: brightness(0.8); 
    }
}

.Toastify__toast {
    font-size: 1rem; 
    padding: 16px 24px; 
}

.Toastify__toast--error {
    background: ${props => props.theme["red-700"]};
    color: ${props => props.theme["gray-100"]};
}

.Toastify__toast--success {
    background: ${props => props.theme["green-500"]};
    color: ${props => props.theme["gray-100"]};
}

.Toastify__toast--info {
    background: ${props => props.theme["blue-600"]};
    color: ${props => props.theme["gray-100"]};
}

@media (max-width: 768px) {
    .Toastify__toast {
        font-size: 0.875rem; 
        padding: 12px 18px; 
    }
}

@media (max-width: 480px) {
    .Toastify__toast {
        font-size: 0.75rem; 
        padding: 10px 14px; 
    }
}

`