package com.projetoNuti.domain;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
public class Contrato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dataVigenciaInicial;
    private String dataVigenciaFinal;
    private String razaoSocialFornecedor;
    private String objetoContrato;
    private BigDecimal valorInicial;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consulta_id")
    private Consulta consulta;
}
