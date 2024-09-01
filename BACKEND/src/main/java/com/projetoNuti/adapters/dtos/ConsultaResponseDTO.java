package com.projetoNuti.adapters.dtos;

import lombok.Data;

@Data
public class ConsultaResponseDTO {
    private Long id;
    private String nomeConsulta;
    private String cnpj;
    private String razaoSocial;
    private String poderId;
    private String esferaId;
}
