import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";

// Criação do contexto para armazenar e compartilhar os dados das consultas
const ConsultasContext = createContext({});

export function ConsultasProvider({ children }) {
    const [listaConsultas, setListaConsultas] = useState([]); // Estado para armazenar a lista de consultas
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

    // Função para carregar todas as consultas do backend
    async function carregarConsultas() {
        setIsLoading(true); // Inicia o estado de carregamento
        try {
            // Faz uma requisição GET para obter as consultas do backend
            const response = await api.get("/api/consultas");
            // Formata as consultas recebidas para o formato esperado
            const consultasFormatadas = response.data.map((consulta) => ({
                id: consulta.id,
                nomeConsulta: consulta.nomeConsulta,
                cnpj: consulta.cnpj,
            }));
            // Atualiza o estado com as consultas formatadas
            setListaConsultas(consultasFormatadas);
        } catch (error) {
            console.error("Erro ao carregar consultas:", error); // Loga o erro no console
        } finally {
            setIsLoading(false); // Finaliza o estado de carregamento
        }
    }

    // Função para deletar uma consulta do backend
    async function deletarConsulta(consultaId) {
        try {
            // Faz uma requisição DELETE para remover a consulta pelo ID
            await api.delete(`/api/consultas/${consultaId}`);
            // Atualiza o estado removendo a consulta deletada da lista
            setListaConsultas((prevConsultas) =>
                prevConsultas.filter((consulta) => consulta.id !== consultaId)
            );
            toast.success("Consulta deletada com sucesso."); // Notificação de sucesso
        } catch (error) {
            console.error("Erro ao deletar consulta:", error); // Loga o erro no console
        }
    }

    return (
        // Provedor do contexto que compartilha os estados e funções com os componentes filhos
        <ConsultasContext.Provider
            value={{
                listaConsultas,
                isLoading,
                deletarConsulta,
                carregarConsultas
            }}
        >
            {children}
        </ConsultasContext.Provider>
    );
}

// Hook personalizado para usar o contexto de Consultas
export function useConsultas() {
    const context = useContext(ConsultasContext);

    if (!context) {
        throw new Error("useConsultas must be used within a ConsultasProvider");
    }

    return context;
}
