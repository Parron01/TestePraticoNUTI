package com.projetoNuti.adapters.dtos;

import lombok.Data;

import java.util.List;

@Data
public class ConsultaRequestDTO {
    private String nomeConsulta;
    private String cnpj;
    private String razaoSocial;
    private String poder;
    private String esfera;
    private List<ContratoDTO> contratos;
}
