package com.projetoNuti.infra.exceptions;

import java.time.LocalDateTime;

public class ConsultaNotFoundException extends RuntimeException {
    private static final String MESSAGE = "Consulta não encontrada";

    private final String details;

    public ConsultaNotFoundException(Long id) {
        super(MESSAGE);
        this.details = "ID buscado: " + id + " | Data do erro: " + LocalDateTime.now();
    }

    public ConsultaNotFoundException(String details) {
        super(MESSAGE);
        this.details = details;
    }

    public String getDetails() {
        return details;
    }
}
