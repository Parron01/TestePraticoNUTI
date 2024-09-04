import Modal from "react-modal";
import {
    ConsultaModalContainer,
    LoadingSpinner,
    SendButton,
} from "./ConsultaModal.styles";
import { IoMdClose } from "react-icons/io";
import { FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { useContratos } from "../../hooks/useContratos";
import { useState } from "react";

// Componente que representa o modal de consulta de contratos
export function ConsultaModal() {
    // Estados e funções obtidos através do hook customizado useContratos
    const {
        isModalOpen,           // Controla a visibilidade do modal
        handleCloseModal,      // Função para fechar o modal
        handleCreateConsulta,  // Função para criar uma nova consulta
        isLoading,             // Indica se uma operação de carregamento está em andamento
    } = useContratos();

    // Estados locais para armazenar as entradas do usuário
    const [cnpj, setCnpj] = useState("");          // Armazena o CNPJ inserido pelo usuário
    const [dataInicio, setDataInicio] = useState("");  // Armazena a data de início inserida pelo usuário
    const [dataFim, setDataFim] = useState("");    // Armazena a data de fim inserida pelo usuário

    // Função que lida com a submissão do formulário de consulta
    async function handleConsultar(event) {
        event.preventDefault();

        // Formata as datas para o formato esperado pela API
        const dataInicioFormatada = dataInicio.replace(/-/g, "");
        const dataFimFormatada = dataFim.replace(/-/g, "");

        // Chama a função para criar a consulta passando o CNPJ e as datas formatadas
        await handleCreateConsulta(cnpj, dataInicioFormatada, dataFimFormatada);

        // Reseta os campos de entrada após a consulta
        setCnpj("");
        setDataInicio("");
        setDataFim("");
    }

    return (
        // Modal configurado para exibição da interface de consulta
        <Modal
            isOpen={isModalOpen}            // Controla se o modal está visível
            onRequestClose={handleCloseModal} // Fecha o modal ao clicar fora ou no botão de fechar
            overlayClassName="react-modal-overlay" // Classe CSS personalizada para o overlay do modal
            className="react-modal-content"  // Classe CSS personalizada para o conteúdo do modal
        >
            {/* Botão de fechar modal */}
            <button
                type="button"
                onClick={handleCloseModal}
                className="react-modal-close"
            >
                <IoMdClose size={28} />
            </button>

            {/* Formulário de consulta dentro do modal */}
            <ConsultaModalContainer onSubmit={handleConsultar}>
                <h1>Consultar Contratos</h1>
                
                {/* Campo de entrada para o CNPJ do órgão */}
                <div className="form-group">
                    <label htmlFor="cnpj">
                        <FaBuilding size={20} />
                        CNPJ do Órgão
                    </label>
                    <input
                        id="cnpj"
                        type="text"
                        placeholder="CNPJ do Órgão"
                        value={cnpj}
                        onChange={(event) => setCnpj(event.target.value)}
                    />
                    <label>
                    <span>CNPJ de Exemplo= 46341038000129</span>
                    </label>
                </div>

                {/* Campo de entrada para a data inicial da consulta */}
                <div className="form-group">
                    <label htmlFor="dataInicio">
                        <FaCalendarAlt size={20} />
                        Data Inicial
                    </label>
                    <input
                        id="dataInicio"
                        type="date"
                        value={dataInicio}
                        onChange={(event) => setDataInicio(event.target.value)}
                    />
                </div>

                {/* Campo de entrada para a data final da consulta */}
                <div className="form-group">
                    <label htmlFor="dataFim">
                        <FaCalendarAlt size={20} />
                        Data Final
                    </label>
                    <input
                        id="dataFim"
                        type="date"
                        value={dataFim}
                        onChange={(event) => setDataFim(event.target.value)}
                    />
                </div>

                {/* Botão para submeter o formulário de consulta */}
                <SendButton type="submit" disabled={isLoading}>
                    {isLoading ? "Carregando..." : "Consultar"} {/* Texto do botão altera conforme estado de carregamento */}
                    {isLoading && <LoadingSpinner />} {/* Exibe spinner de carregamento durante a consulta */}
                </SendButton>
            </ConsultaModalContainer>
        </Modal>
    );
}
