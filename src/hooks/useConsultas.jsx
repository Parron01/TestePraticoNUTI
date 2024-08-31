import React, { createContext, useContext, useState, useEffect } from "react";

// Estrutura para armazenar dados das consultas
const ConsultasContext = createContext({});

export function ConsultasProvider({ children }) {
    const [consultas, setConsultas] = useState([]);

    // Dados fictícios para teste
    useEffect(() => {
        const dadosFicticios = [
            {
                id: 1,
                nomeConsulta: "Consulta: 12345678000195 - de 2024-08-01 até 2024-08-30",
            }
        ];
        console.log("Adicionando dados fictícios:", dadosFicticios); // Adicionando log para verificar
        setConsultas(dadosFicticios);
    }, []);

    // Função para deletar uma consulta (a ser implementada)
    function deleteConsulta(consultaId) {
        // Lógica para deletar uma consulta
        setConsultas((prevConsultas) => prevConsultas.filter(consulta => consulta.id !== consultaId));
    }

    return (
        <ConsultasContext.Provider
            value={{
                consultas,
                deleteConsulta,
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
