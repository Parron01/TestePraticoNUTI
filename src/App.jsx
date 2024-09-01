import Modal from 'react-modal'; // Importe o Modal
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { ContratosProvider } from "./hooks/useContratos";
import { ConsultasProvider } from './hooks/useConsultas';

// Defina o elemento principal da aplicação para acessibilidade
Modal.setAppElement('#root');

function App() {
  return (
    <BrowserRouter>
      <ContratosProvider>
        <ConsultasProvider>
          <ThemeProvider theme={defaultTheme}>
            <Router />
            <GlobalStyle />
          </ThemeProvider>
        </ConsultasProvider>
      </ContratosProvider>
    </BrowserRouter>
  );
}

export default App;
