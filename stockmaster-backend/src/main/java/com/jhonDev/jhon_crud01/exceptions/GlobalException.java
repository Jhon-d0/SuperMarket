package com.jhonDev.jhon_crud01.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIlegalArgumentException (IllegalArgumentException error){
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("Mensage:", error.getMessage(),
                             "Error:", "True"
                ));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> RuntimeException(RuntimeException erro) {
        return ResponseEntity
                .badRequest()
                .body(Map.of("menssagem", erro.getMessage(),
                        "erro", "true"
                ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleMethodArgumentNotValidException(MethodArgumentNotValidException erro) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("menssagem", erro.getFieldErrors().get(0).getDefaultMessage(),
                        "sucesso", "false"
                ));

    }

}
