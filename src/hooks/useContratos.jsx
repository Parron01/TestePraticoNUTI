import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function formatData(data) {
    const ano = data.substring(0, 4);
    const mes = data.substring(4, 6);
    const dia = data.substring(6, 8);
    return `${dia}/${mes}/${ano}`;
}

// Função para formatar CNPJ no formato xx.xxx.xxx/xxxx-xx
export function formatCnpj(cnpj) {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

// Estrutura para armazenar dados dos contratos
const ContratosContext = createContext({});

export function ContratosProvider({ children }) {
    const [contratos, setContratos] = useState([]);
    const [orgaoInfo, setOrgaoInfo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [nomeConsulta, setNomeConsulta] = useState(""); // Adiciona estado para o nome da consulta
    
    // Função para abrir o modal
    function handleOpenModal() {
        setIsModalOpen(true);
    }

    // Função para fechar o modal
    function handleCloseModal() {
        setIsModalOpen(false);
    }

    // Função para criar a consulta e fazer a requisição
    async function handleCreateConsulta(cnpjOrgao, dataInicial, dataFinal) {
        try {
            setIsLoading(true); // Inicia o estado de carregamento
            
            const cnpjFormatado = formatCnpj(cnpjOrgao);
            const dataInicialFormatada = formatData(dataInicial);
            const dataFinalFormatada = formatData(dataFinal);
            // Define o nome da consulta
            const nomeConsulta = `Consulta: ${cnpjFormatado} - de ${dataInicialFormatada} até ${dataFinalFormatada}`;
            setNomeConsulta(nomeConsulta);

            const response = await fetchContratos(cnpjOrgao, dataInicial, dataFinal);
            if (response && response.data) {
                const contratosObtidos = response.data.map(contrato => ({
                    dataVigenciaInicial: contrato.dataVigenciaInicio,
                    dataVigenciaFinal: contrato.dataVigenciaFim,
                    razaoSocialFornecedor: contrato.nomeRazaoSocialFornecedor,
                    objeto: contrato.objetoContrato,
                    valorInicial: contrato.valorInicial,
                }));
                setContratos(contratosObtidos);

                // Armazena as informações do órgão, supondo que todos os contratos vêm do mesmo órgão
                if (response.data.length > 0) {
                    const orgao = response.data[0].orgaoEntidade;
                    setOrgaoInfo({
                        cnpj: orgao.cnpj,
                        razaoSocial: orgao.razaoSocial,
                        poderId: orgao.poderId,
                        esferaId: orgao.esferaId,
                    });
                }
                toast.success("Consulta realizada com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao buscar contratos:", error);
        } finally {
            setIsLoading(false); // Encerra o estado de carregamento
            handleCloseModal();
        }
    }

    // Função para buscar contratos da API
    async function fetchContratos(cnpjOrgao, dataInicial, dataFinal) {
        const url = `https://pncp.gov.br/api/consulta/v1/contratos`;
        const params = {
            cnpjOrgao,
            dataInicial,
            dataFinal,
            pagina: 1,
        };

        try {
            const response = await axios.get(url, { params });
            return response.data;
        } catch (error) {
            // Mapeia os códigos de erro específicos e exibe um toast apropriado
            if (error.response) {
                switch (error.response.status) {
                    case 204:
                        toast.error("Nenhum conteúdo disponível para a consulta realizada.");
                        break;
                    case 400:
                        toast.error("Requisição inválida. Verifique os dados fornecidos.");
                        break;
                    case 401:
                        toast.error("Não autorizado. Verifique suas credenciais.");
                        break;
                    case 422:
                        toast.error("Entidade não processável. Verifique os dados fornecidos.");
                        break;
                    case 500:
                        toast.error("Erro interno no servidor. Tente novamente mais tarde.");
                        break;
                    default:
                        toast.error(`Erro: ${error.response.data || "Ocorreu um erro inesperado."}`);
                }
            } else {
                toast.error("Erro na conexão com o servidor. Verifique sua internet.");
            }
            throw error;
        }
    }

    return (
        <ContratosContext.Provider
            value={{
                contratos,
                orgaoInfo,
                isModalOpen,
                isLoading,
                nomeConsulta, 
                handleOpenModal,
                handleCloseModal,
                handleCreateConsulta,
            }}
        >
            {children}
        </ContratosContext.Provider>
    );
}

export function useContratos() {
    const context = useContext(ContratosContext);

    if (!context) {
        throw new Error("useContratos must be used within a ContratosProvider");
    }

    return context;
}
