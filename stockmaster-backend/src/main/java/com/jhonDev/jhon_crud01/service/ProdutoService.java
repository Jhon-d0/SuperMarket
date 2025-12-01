package com.jhonDev.jhon_crud01.service;

import com.jhonDev.jhon_crud01.dto.ProdutoRequestDTO;
import com.jhonDev.jhon_crud01.dto.ProdutoResponseDTO;
import com.jhonDev.jhon_crud01.infrastruture.entites.Produto;
import com.jhonDev.jhon_crud01.infrastruture.repository.ProdutoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository repository;

    private ProdutoResponseDTO toResponse(Produto produto) {
        return new ProdutoResponseDTO(
                produto.getId(),
                produto.getNome(),
                produto.getPreco(),
                produto.getQuantidade(),
                produto.getCategoria()
        );
    }

    public List<ProdutoResponseDTO> filtrar(String nome) {
        return repository.findByFilters(nome)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ProdutoResponseDTO buscarPorId(Integer id) {
        var produto = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

        return toResponse(produto);
    }

    public ProdutoResponseDTO salvar(ProdutoRequestDTO dto) {
        var produto = Produto.builder()
                .nome(dto.nome())
                .preco(dto.preco())
                .quantidade(dto.quantidade())
                .categoria(dto.categoria())
                .build();

        repository.save(produto);

        return toResponse(produto);
    }

    public ProdutoResponseDTO atualizar(Integer id, ProdutoRequestDTO dto) {
        var produto = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

        produto.setNome(dto.nome());
        produto.setPreco(dto.preco());
        produto.setQuantidade(dto.quantidade());
        produto.setCategoria(dto.categoria());

        repository.save(produto);

        return toResponse(produto);
    }

    public void deletar(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Produto não encontrado");
        }
        repository.deleteById(id);
    }
}
