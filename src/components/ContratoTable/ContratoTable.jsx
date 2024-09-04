import React, { useState } from 'react';
import { formatCnpj, useContratos } from '../../hooks/useContratos';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  TableContainer,
  Title,
  Description,
  OrgaoInfo,
  Table,
  TableHeader,
  TableHeaderRow,
  TableBody,
  TableRow,
  TableCell,
  TotalRow,
  TotalCell,
  PaginationContainer,
  PaginationButton,
} from './ContratoTable.styles';

// Função para mapear os IDs de Poder para seus nomes correspondentes
const mapPoderIdToName = (poderId) => {
  switch (poderId) {
    case 'L':
      return 'Legislativo';
    case 'E':
      return 'Executivo';
    case 'J':
      return 'Judiciário';
    default:
      return poderId; 
  }
};

// Função para mapear os IDs de Esfera para seus nomes correspondentes
const mapEsferaIdToName = (esferaId) => {
  switch (esferaId) {
    case 'F':
      return 'Federal';
    case 'E':
      return 'Estadual';
    case 'M':
      return 'Municipal';
    case 'D':
      return 'Distrital';
    default:
      return esferaId; 
  }
};

const ContratoTable = () => {
  // Parte Lógica Consumida do Hook personalizado useContratos
  const {
    listaContratos,
    nomeConsulta,
    informacoesOrgao,
    fetchConsultaById,
    setListaContratos,
    setNomeConsulta,
    setInformacoesOrgao,
  } = useContratos();

  const [paginaAtual, setPaginaAtual] = useState(1);
  const contratosPorPagina = 5; // Define quantos contratos são exibidos por página
  const location = useLocation(); 
  const consultaId = location.state?.consultaId; // Obtém o ID da consulta a partir da navegação
  const navigate = useNavigate(); 

  // Verifica se há um ID de consulta e, em caso positivo, carrega os dados da consulta
  if (consultaId) {
    fetchConsultaById(consultaId)
      .then((consultaData) => {
        // Define os dados da consulta no estado
        setListaContratos(consultaData.contratos);
        setNomeConsulta(consultaData.nomeConsulta);
        setInformacoesOrgao({
          cnpj: consultaData.cnpj,
          razaoSocial: consultaData.razaoSocial,
          poderId: consultaData.poder,
          esferaId: consultaData.esfera,
        });
        // Limpa o estado consultaId após carregar os dados
        navigate('/contratos', { state: { consultaId: null } });
      })
      .catch((error) => {
        toast.error("Erro ao carregar a consulta.");
      });
  }

  // Calcula o valor total dos contratos exibidos
  const valorTotal = listaContratos.reduce((total, contrato) => total + contrato.valorInicial, 0);

  // Define os índices de início e fim para a paginação
  const indiceInicial = (paginaAtual - 1) * contratosPorPagina;
  const contratosPaginaAtual = listaContratos.slice(indiceInicial, indiceInicial + contratosPorPagina);

  // Calcula o número total de páginas
  const totalPaginas = Math.ceil(listaContratos.length / contratosPorPagina);

  // Função para ir para a página anterior
  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  // Função para ir para a próxima página
  const handleProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  return (
    <TableContainer>
      <Title>{nomeConsulta || "Consulta"}</Title>
      {informacoesOrgao && (
        <OrgaoInfo>
          <p>Órgão: {informacoesOrgao.razaoSocial} (CNPJ: {formatCnpj(informacoesOrgao.cnpj)})</p>
          <p>Poder: {mapPoderIdToName(informacoesOrgao.poderId)}</p>
          <p>Esfera: {mapEsferaIdToName(informacoesOrgao.esferaId)}</p>
        </OrgaoInfo>
      )}
      <Description>Esta tabela exibe os contratos associados ao CNPJ informado.</Description>
      <Table>
        <TableHeader>
          <TableHeaderRow>
            <TableCell>Data de Vigência Inicial</TableCell>
            <TableCell>Data de Vigência Final</TableCell>
            <TableCell>Razão Social do Fornecedor</TableCell>
            <TableCell>Objeto do Contrato</TableCell>
            <TableCell>Valor Inicial do Contrato</TableCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {contratosPaginaAtual.map((contrato, index) => (
            <TableRow key={index}>
              <TableCell>{contrato.dataVigenciaInicial}</TableCell>
              <TableCell>{contrato.dataVigenciaFinal}</TableCell>
              <TableCell>{contrato.razaoSocialFornecedor}</TableCell>
              <TableCell>{contrato.objeto}</TableCell>
              <TableCell>
                {contrato.valorInicial.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <tfoot>
          <TotalRow>
            <TotalCell colSpan="4">Valor Total dos Contratos:</TotalCell>
            <TotalCell>{valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TotalCell>
          </TotalRow>
        </tfoot>
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

export default ContratoTable;
