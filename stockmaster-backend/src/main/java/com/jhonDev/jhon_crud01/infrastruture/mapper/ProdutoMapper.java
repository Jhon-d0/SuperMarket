package com.jhonDev.jhon_crud01.infrastruture.mapper;

import com.jhonDev.jhon_crud01.infrastruture.entites.Produto;
import com.jhonDev.jhon_crud01.dto.ProdutoResponseDTO;

public class ProdutoMapper {

    public static ProdutoResponseDTO toDTO(Produto p) {
        return ProdutoResponseDTO.builder()
                .id(p.getId())
                .nome(p.getNome())
                .preco(p.getPreco())
                .quantidade(p.getQuantidade())
                .categoria(p.getCategoria())
                .build();
    }
}
