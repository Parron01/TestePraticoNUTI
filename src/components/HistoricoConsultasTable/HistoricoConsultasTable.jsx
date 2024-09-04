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
  Description,
} from './HistoricoConsultasTable.styles';
import { useConsultas } from '../../hooks/useConsultas';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

const HistoricoConsultasTable = () => {
  const { listaConsultas = [], deletarConsulta, isLoading, carregarConsultas } = useConsultas(); // Hook customizado para gerenciar estado e operações relacionadas a consultas
  const [paginaAtual, setPaginaAtual] = useState(1); // Estado para controlar a página atual da tabela
  const [isDeleting, setIsDeleting] = useState(false); // Novo estado para controlar o loading ao deletar
  const consultasPorPagina = 5; // Número de consultas a serem exibidas por página
  const navigate = useNavigate(); // Hook para navegação programática

  // Carregar as consultas ao montar o componente
  useEffect(() => {
    carregarConsultas();
  }, []);

  // Determinar o índice inicial e selecionar as consultas para a página atual
  const indiceInicial = (paginaAtual - 1) * consultasPorPagina;
  const consultasPaginaAtual = listaConsultas.slice(indiceInicial, indiceInicial + consultasPorPagina);

  // Calcular o total de páginas
  const totalPaginas = Math.ceil(listaConsultas.length / consultasPorPagina);

  // Navegação entre páginas
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

  // Navegar para a página de detalhes da consulta selecionada
  const handleConsultaClick = (consultaId) => {
    navigate('/contratos', { state: { consultaId } });
  };

  // Excluir uma consulta com confirmação e exibir um loading durante o processo
  const handleDeleteClick = async (consultaId) => {
    if (window.confirm("Tem certeza que deseja deletar esta consulta?")) {
      setIsDeleting(true); // Ativa o loading ao deletar
      await deletarConsulta(consultaId);
      setIsDeleting(false); // Desativa o loading após deletar
    }
  };

  // Exibe um overlay de carregamento se as consultas estiverem sendo carregadas
  if (isLoading) {
    return <LoadingOverlay message="Carregando... Isso pode levar um tempo..(50s+)" />;
  }

  // Exibe um overlay de carregamento ao deletar uma consulta
  if (isDeleting) {
    return <LoadingOverlay message="Deletando..." />;
  }

  return (
    <TableContainer>
      <Title>Histórico de Consultas</Title>
      <Description>Esta tabela exibe o histórico de todas as consultas feitas e armazenadas.</Description>
      <Description>Clique para ver mais informações sobre a consulta.</Description>
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
