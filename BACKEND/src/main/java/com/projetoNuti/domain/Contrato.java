package com.projetoNuti.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @Column(length = 1000)
    private String objetoContrato;
    private BigDecimal valorInicial;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consulta_id")
    @JsonBackReference
    private Consulta consulta;
}
