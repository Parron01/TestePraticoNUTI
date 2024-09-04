import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../services/api";

// Funções utilitárias para formatação de datas e CNPJ
function formatData(data) {
    const ano = data.substring(0, 4);
    const mes = data.substring(4, 6);
    const dia = data.substring(6, 8);
    return `${dia}/${mes}/${ano}`;
}

function formatDataAtual() {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

export function formatCnpj(cnpj) {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

// Criação do contexto para gerenciar o estado dos contratos
const ContratosContext = createContext({});

export function ContratosProvider({ children }) {
    // Estados para gerenciar as informações relacionadas aos contratos
    const [listaContratos, setListaContratos] = useState([]);
    const [informacoesOrgao, setInformacoesOrgao] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [nomeConsulta, setNomeConsulta] = useState("");

    // Funções para abrir e fechar o modal
    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    // Função para realizar a consulta de contratos
    async function handleCreateConsulta(cnpjOrgao, dataInicial, dataFinal) {
        try {
            setIsLoading(true);
            toast.info("Iniciando consulta...");

            // Formatação das datas para o formato esperado pela API
            const dataInicialFormatada = formatData(dataInicial);
            const dataFinalFormatada = formatData(dataFinal);
            const dataAtual = formatDataAtual();
            const nomeConsulta = `Consulta realizada em: ${dataAtual} | Período: de ${dataInicialFormatada} até ${dataFinalFormatada}`;
            setNomeConsulta(nomeConsulta);

            // Requisição à API para buscar os contratos
            const response = await fetchContratos(cnpjOrgao, dataInicial, dataFinal);
            if (response && response.data) {
                // Mapeamento dos contratos obtidos para o formato esperado
                const contratosObtidos = response.data.map(contrato => ({
                    dataVigenciaInicial: contrato.dataVigenciaInicio,
                    dataVigenciaFinal: contrato.dataVigenciaFim,
                    razaoSocialFornecedor: contrato.nomeRazaoSocialFornecedor,
                    objeto: contrato.objetoContrato,
                    valorInicial: contrato.valorInicial,
                }));
                setListaContratos(contratosObtidos);

                // Se houver contratos, as informações do órgão são salvas e enviadas ao backend
                if (response.data.length > 0) {
                    const orgao = response.data[0].orgaoEntidade;
                    setInformacoesOrgao({
                        cnpj: orgao.cnpj,
                        razaoSocial: orgao.razaoSocial,
                        poderId: orgao.poderId,
                        esferaId: orgao.esferaId,
                    });
                    // Enviar os dados da consulta ao backend
                    await enviarConsultaAoBackend(nomeConsulta, orgao, contratosObtidos);
                }
                toast.success("Consulta realizada com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao buscar contratos:", error);
        } finally {
            setIsLoading(false);
            handleCloseModal();
        }
    }

    // Função para buscar contratos na API do PNCP
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
            // Tratamento de erros e notificação ao usuário
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
                        toast.error("Erro interno no servidor PNCP. Tente novamente mais tarde.");
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

    // Função para enviar os dados da consulta ao backend
    async function enviarConsultaAoBackend(nomeConsulta, orgaoInfo, contratosObtidos) {
        try {
            const consultaRequestDTO = {
                nomeConsulta,
                cnpj: orgaoInfo.cnpj,
                razaoSocial: orgaoInfo.razaoSocial,
                poder: orgaoInfo.poderId,
                esfera: orgaoInfo.esferaId,
                contratos: contratosObtidos.map(contrato => ({
                    dataVigenciaInicial: contrato.dataVigenciaInicial,
                    dataVigenciaFinal: contrato.dataVigenciaFinal,
                    razaoSocialFornecedor: contrato.razaoSocialFornecedor,
                    objeto: contrato.objeto,
                    valorInicial: contrato.valorInicial,
                })),
            };
            const response = await api.post("/api/consultas", consultaRequestDTO);
            toast.success("Consulta salva no histórico com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar a consulta no histórico:", error);
            toast.error("Erro ao salvar a consulta no histórico.");
        }
    }

    // Função para buscar uma consulta específica pelo ID
    async function fetchConsultaById(id) {
        try {
            const response = await api.get(`/api/consultas/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar consulta:", error);
            toast.error("Erro ao buscar consulta.");
            throw error;
        }
    }

    // Provedor do contexto para compartilhar os estados e funções com outros componentes
    return (
        <ContratosContext.Provider
            value={{
                listaContratos,
                informacoesOrgao,
                isModalOpen,
                isLoading,
                nomeConsulta,
                handleOpenModal,
                handleCloseModal,
                handleCreateConsulta,
                fetchConsultaById,
                setListaContratos,
                setNomeConsulta,
                setInformacoesOrgao,
            }}
        >
            {children}
        </ContratosContext.Provider>
    );
}

// Hook personalizado para acessar o contexto de Contratos
export function useContratos() {
    const context = useContext(ContratosContext);

    if (!context) {
        throw new Error("useContratos must be used within a ContratosProvider");
    }

    return context;
}
