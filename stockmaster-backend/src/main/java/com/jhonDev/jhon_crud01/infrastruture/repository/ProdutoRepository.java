package com.jhonDev.jhon_crud01.infrastruture.repository;

import com.jhonDev.jhon_crud01.infrastruture.entites.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

    @Query("""
    SELECT p FROM Produto p
    WHERE (:nome IS NULL OR LOWER(p.nome) LIKE LOWER(CONCAT('%', :nome, '%')))
    """)
    List<Produto> findByFilters(String nome);
}
