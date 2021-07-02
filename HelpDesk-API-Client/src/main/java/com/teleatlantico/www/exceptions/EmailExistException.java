package com.teleatlantico.www.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
public class EmailExistException extends RuntimeException {
    public EmailExistException() {
        super("El correo ya ha sido ingresado");
    }
}
