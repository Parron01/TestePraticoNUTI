import Modal from "react-modal";
import {
    ConsultaModalContainer,
    SendButton,
} from "./ConsultaModal.styles";
import { IoMdClose } from "react-icons/io";
import { FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { useContratos } from "../../hooks/useContratos";
import { useState } from "react";


export function ConsultaModal() {
    const {
        isModalOpen,
        handleCloseModal,
        handleCreateConsulta,
    } = useContratos();

    const [cnpj, setCnpj] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");

    async function handleConsultar(event) {
        event.preventDefault();

        // Formatação das datas para o formato necessário
        const dataInicioFormatada = dataInicio.replace(/-/g, "");
        const dataFimFormatada = dataFim.replace(/-/g, "");

        await handleCreateConsulta(cnpj, dataInicioFormatada, dataFimFormatada);

        // Limpa os campos do formulário após a consulta
        setCnpj("");
        setDataInicio("");
        setDataFim("");
    }

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type="button"
                onClick={handleCloseModal}
                className="react-modal-close"
            >
                <IoMdClose size={28} />
            </button>
            <ConsultaModalContainer onSubmit={handleConsultar}>
                <h1>Consultar Contratos</h1>
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
                </div>
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
                <SendButton type="submit">
                    Consultar
                </SendButton>
            </ConsultaModalContainer>
        </Modal>
    );
}
