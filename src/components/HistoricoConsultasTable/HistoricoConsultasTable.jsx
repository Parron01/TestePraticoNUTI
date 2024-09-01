import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import {
  TableContainer,
  Title,
  Table,
  TableHeader,
  TableHeaderRow,
  TableBody,
  TableRow,
  TableCell,
  PaginationContainer,
  PaginationButton,
  DeleteButton,
  Description
} from './HistoricoConsultasTable.styles';
import { useConsultas } from '../../hooks/useConsultas';

const HistoricoConsultasTable = () => {
  const { listaConsultas = [], deletarConsulta, isLoading , carregarConsultas} = useConsultas();
  const [paginaAtual, setPaginaAtual] = useState(1);
  const consultasPorPagina = 5;
  const navigate = useNavigate();

  useEffect(() => {
    carregarConsultas();
  }, []);

  const indiceInicial = (paginaAtual - 1) * consultasPorPagina;
  const consultasPaginaAtual = listaConsultas.slice(indiceInicial, indiceInicial + consultasPorPagina);

  const totalPaginas = Math.ceil(listaConsultas.length / consultasPorPagina);

  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const handleProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const handleConsultaClick = (consultaId) => {
    navigate('/contratos', { state: { consultaId } });
  };

  const handleDeleteClick = (consultaId) => {
    if (window.confirm("Tem certeza que deseja deletar esta consulta?")) {
      deletarConsulta(consultaId);
    }
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <TableContainer>
      <Title>Histórico de Consultas</Title>
      <Description>Esta tabela exibe o histórico de todas as consultas feitas e armazenadas.</Description>
      <Table>
        <TableHeader>
          <TableHeaderRow>
            <TableCell>Nome da Consulta</TableCell>
            <TableCell>CNPJ</TableCell>
            <TableCell>Ações</TableCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {consultasPaginaAtual.map((consulta, index) => (
            <TableRow
              key={index}
              onClick={() => handleConsultaClick(consulta.id)}
              title="Clique para ver mais informações"
            >
              <TableCell>{consulta.nomeConsulta}</TableCell>
              <TableCell>{consulta.cnpj}</TableCell>
              <TableCell className="centered">
                <DeleteButton onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(consulta.id);
                }}>
                  <FaTrash size={24} />
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationContainer>
        <PaginationButton onClick={handlePaginaAnterior} disabled={paginaAtual === 1}>
          Anterior
        </PaginationButton>
        <span>{paginaAtual} de {totalPaginas}</span>
        <PaginationButton onClick={handleProximaPagina} disabled={paginaAtual === totalPaginas}>
          Próxima
        </PaginationButton>
      </PaginationContainer>
    </TableContainer>
  );
};

export default HistoricoConsultasTable;
