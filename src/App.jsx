import Modal from 'react-modal'; // Importa o componente Modal para diálogos modais
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { ContratosProvider } from "./hooks/useContratos";
import { ConsultasProvider } from './hooks/useConsultas';

// Define o elemento principal da aplicação para acessibilidade, necessário para o funcionamento do react-modal
Modal.setAppElement('#root');

function App() {
  return (
    <BrowserRouter>
      <ContratosProvider> {/* Fornece o contexto dos contratos para toda a aplicação */}
        <ConsultasProvider> {/* Fornece o contexto das consultas para toda a aplicação */}
          <ThemeProvider theme={defaultTheme}> {/* Aplica o tema padrão definido para a aplicação */}
            <Router /> {/* Gerencia as rotas da aplicação */}
            <GlobalStyle /> {/* Aplica os estilos globais */}
          </ThemeProvider>
        </ConsultasProvider>
      </ContratosProvider>
    </BrowserRouter>
  );
}

export default App;
