import React, { useState } from 'react';
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
  const { consultas = [], deleteConsulta } = useConsultas();
  const [paginaAtual, setPaginaAtual] = useState(1);
  const consultasPorPagina = 5;
  const navigate = useNavigate();

  // Lógica para obter as consultas da página atual
  const indiceInicial = (paginaAtual - 1) * consultasPorPagina;
  const consultasPaginaAtual = consultas.slice(indiceInicial, indiceInicial + consultasPorPagina);

  const totalPaginas = Math.ceil(consultas.length / consultasPorPagina);

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
    navigate(`/contratos?consultaId=${consultaId}`);
  };

  const handleDeleteClick = (consultaId) => {
    deleteConsulta(consultaId);
  };

  return (
    <TableContainer>
      <Title>Histórico de Consultas</Title>
      <Description>Esta tabela exibe o histórico de todas as consultas feitas e armazenadas.</Description>
      <Table>
        <TableHeader>
          <TableHeaderRow>
            <TableCell>Nome da Consulta</TableCell>
            <TableCell>Ações</TableCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {consultasPaginaAtual.map((consulta, index) => (
            <TableRow key={index} onClick={() => handleConsultaClick(consulta.id)}>
              <TableCell>{consulta.nomeConsulta}</TableCell>
              <TableCell>
                <DeleteButton onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(consulta.id);
                }}>
                  <FaTrash />
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Componentes de Paginação */}
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
