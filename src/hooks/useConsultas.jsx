import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Estrutura para armazenar dados das consultas
const ConsultasContext = createContext({});

export function ConsultasProvider({ children }) {
    const [listaConsultas, setListaConsultas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Função para buscar todas as consultas do back-end
    async function carregarConsultas() {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/consultas");
            const consultasFormatadas = response.data.map((consulta) => ({
                id: consulta.id,
                nomeConsulta: consulta.nomeConsulta,
                cnpj: consulta.cnpj,
            }));
            setListaConsultas(consultasFormatadas);
        } catch (error) {
            console.error("Erro ao carregar consultas:", error);
        } finally {
            setIsLoading(false);
        }
    }

    // Função para deletar uma consulta do back-end
    async function deletarConsulta(consultaId) {
        try {
            await axios.delete(`http://localhost:8080/api/consultas/${consultaId}`);
            setListaConsultas((prevConsultas) =>
                prevConsultas.filter((consulta) => consulta.id !== consultaId)
            );
            toast.success("Consulta deletada com sucesso.");
        } catch (error) {
            console.error("Erro ao deletar consulta:", error);
            toast.error("Erro ao deletar a consulta.");
        }
    }

    return (
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

export function useConsultas() {
    const context = useContext(ConsultasContext);

    if (!context) {
        throw new Error("useConsultas must be used within a ConsultasProvider");
    }

    return context;
}
