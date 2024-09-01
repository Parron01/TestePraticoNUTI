package com.projetoNuti.infra.exceptions;

import java.time.LocalDateTime;

public class ErrorResponse {
    private final String message;
    private final String details;
    private final LocalDateTime timestamp;

    public ErrorResponse(String message, String details, LocalDateTime timestamp) {
        this.message = message;
        this.details = details;
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public String getDetails() {
        return details;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}