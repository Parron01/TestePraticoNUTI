package com.projetoNuti.adapters.dtos;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ContratoDTO {
    private String dataVigenciaInicial;
    private String dataVigenciaFinal;
    private String razaoSocialFornecedor;
    private String objeto;
    private BigDecimal valorInicial;
}
