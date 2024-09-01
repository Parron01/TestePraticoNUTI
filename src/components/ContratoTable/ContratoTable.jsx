import React, { useState, useEffect } from 'react';
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
  const contratosPorPagina = 5;
  const location = useLocation();
  const consultaId = location.state?.consultaId;
  const navigate = useNavigate();

  // Chamar a função fetchConsultaById fora do useEffect
  if (consultaId) {
    fetchConsultaById(consultaId)
      .then((consultaData) => {
        setListaContratos(consultaData.contratos);
        setNomeConsulta(consultaData.nomeConsulta);
        setInformacoesOrgao({
          cnpj: consultaData.cnpj,
          razaoSocial: consultaData.razaoSocial,
          poderId: consultaData.poder,
          esferaId: consultaData.esfera,
        });
        // Limpar o estado consultaId após carregar os dados
        navigate('/contratos', { state: { consultaId: null } });
      })
      .catch((error) => {
        toast.error("Erro ao carregar a consulta.");
      });
  }

  const valorTotal = listaContratos.reduce((total, contrato) => total + contrato.valorInicial, 0);

  const indiceInicial = (paginaAtual - 1) * contratosPorPagina;
  const contratosPaginaAtual = listaContratos.slice(indiceInicial, indiceInicial + contratosPorPagina);

  const totalPaginas = Math.ceil(listaContratos.length / contratosPorPagina);

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
