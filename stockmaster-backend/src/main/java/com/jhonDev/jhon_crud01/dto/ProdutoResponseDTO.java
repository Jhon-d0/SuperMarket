package com.jhonDev.jhon_crud01.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProdutoResponseDTO {
    private Integer id;
    private String nome;
    private Double preco;
    private Integer quantidade;
    private String categoria;
}
