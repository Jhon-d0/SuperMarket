package com.jhonDev.jhon_crud01.service;

import com.jhonDev.jhon_crud01.dto.UsuarioRequestDTO;
import com.jhonDev.jhon_crud01.dto.UsuarioResponseDTO;
import com.jhonDev.jhon_crud01.infrastruture.entites.Usuario;
import com.jhonDev.jhon_crud01.infrastruture.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    private UsuarioResponseDTO toResponse(Usuario usuario) {
        return new UsuarioResponseDTO(usuario.getNome(), usuario.getEmail());
    }

    public List<UsuarioResponseDTO> listarUsuarios() {
        return repository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public UsuarioResponseDTO buscarPorEmail(String email) {

        var usuario = repository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        return toResponse(usuario);
    }

    public UsuarioResponseDTO salvarUsuario(UsuarioRequestDTO dto) {

        if (repository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        var usuario = Usuario.builder()
                .nome(dto.getNome())
                .email(dto.getEmail())
                .senha(passwordEncoder.encode(dto.getSenha()))
                .role("USER") // 👈 padrão para novos usuários
                .build();


        repository.save(usuario);

        return toResponse(usuario);
    }

    public UsuarioResponseDTO atualizarUsuario(String email, UsuarioRequestDTO dto) {

        var usuario = repository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        if (dto.getNome() != null) usuario.setNome(dto.getNome());
        if (dto.getEmail() != null) usuario.setEmail(dto.getEmail());
        if (dto.getSenha() != null) usuario.setSenha(passwordEncoder.encode(dto.getSenha()));

        repository.save(usuario);

        return toResponse(usuario);
    }

    public void deletarUsuario(String email) {
        var usuario = repository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        repository.delete(usuario);
    }
}
