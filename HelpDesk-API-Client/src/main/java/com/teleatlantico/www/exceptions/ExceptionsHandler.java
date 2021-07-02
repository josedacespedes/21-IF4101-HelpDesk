package com.teleatlantico.www.exceptions;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@RestControllerAdvice
public class ExceptionsHandler {
    @ExceptionHandler(Exception.class)
    public String globalExceptionHandler(Exception ex, WebRequest request) {
        return ex.getMessage();
    }
}