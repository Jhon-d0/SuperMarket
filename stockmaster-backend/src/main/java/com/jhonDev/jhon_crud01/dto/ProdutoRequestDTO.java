package com.jhonDev.jhon_crud01.dto;

import jakarta.validation.constraints.*;

public record ProdutoRequestDTO(

        @NotBlank(message = "O nome do produto é obrigatório")
        String nome,

        @NotNull(message = "O preço é obrigatório")
        @Positive(message = "O preço deve ser maior que zero")
        Double preco,

        @NotNull(message = "A quantidade é obrigatória")
        @Min(value = 0, message = "A quantidade não pode ser negativa")
        Integer quantidade,

        @NotBlank(message = "A categoria é obrigatória")
        String categoria
) {}
