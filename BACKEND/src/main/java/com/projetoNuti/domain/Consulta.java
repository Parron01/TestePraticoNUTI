package com.projetoNuti.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Consulta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeConsulta;
    private String cnpj;
    private String razaoSocial;
    private String poder;
    private String esfera;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "consulta")
    @JsonManagedReference
    private List<Contrato> contratos;
}