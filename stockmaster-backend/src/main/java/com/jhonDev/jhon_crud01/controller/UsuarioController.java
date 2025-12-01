package com.jhonDev.jhon_crud01.controller;

import com.jhonDev.jhon_crud01.dto.UsuarioRequestDTO;
import com.jhonDev.jhon_crud01.dto.UsuarioResponseDTO;
import com.jhonDev.jhon_crud01.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cadastro")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService service;

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listarUsuarios() {
        return ResponseEntity.ok(service.listarUsuarios());
    }

    @GetMapping("/{email}")
    public ResponseEntity<UsuarioResponseDTO> buscarPorEmail(@PathVariable String email) {
        return ResponseEntity.ok(service.buscarPorEmail(email));
    }

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> salvarUsuario(@RequestBody UsuarioRequestDTO dto) {
        var usuario = service.salvarUsuario(dto);
        return ResponseEntity.status(201).body(usuario); // CREATED
    }

    @PutMapping("/{email}")
    public ResponseEntity<UsuarioResponseDTO> atualizarUsuario(
            @PathVariable String email,
            @RequestBody UsuarioRequestDTO dto
    ) {
        return ResponseEntity.ok(service.atualizarUsuario(email, dto));
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable String email) {
        service.deletarUsuario(email);
        return ResponseEntity.noContent().build(); // 204 sem body
    }
}
