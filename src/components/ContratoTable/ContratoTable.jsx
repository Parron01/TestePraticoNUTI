import React, { useState } from 'react';
import { useContratos } from '../../hooks/useContratos';
import {
  TableContainer,
  Title,
  Description,
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

const ContratoTable = () => {
  const { contratos, nomeConsulta } = useContratos();
  const [paginaAtual, setPaginaAtual] = useState(1);
  const contratosPorPagina = 5;

  // Cálculo do valor total dos contratos
  const valorTotal = contratos.reduce((total, contrato) => total + contrato.valorInicial, 0);

  // Lógica para obter os contratos da página atual
  const indiceInicial = (paginaAtual - 1) * contratosPorPagina;
  const contratosPaginaAtual = contratos.slice(indiceInicial, indiceInicial + contratosPorPagina);

  const totalPaginas = Math.ceil(contratos.length / contratosPorPagina);

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

export default ContratoTable;
