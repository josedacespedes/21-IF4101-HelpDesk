package com.teleatlantico.www.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class UnidentifiedException extends RuntimeException {
    public UnidentifiedException() {
        super("Error no controlado");
    }
}
