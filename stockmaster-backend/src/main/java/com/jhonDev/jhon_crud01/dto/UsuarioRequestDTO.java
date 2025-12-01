package com.jhonDev.jhon_crud01.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UsuarioRequestDTO {

    @NotBlank(message = "O nome é obrigatório")
    @Size(min = 1, max = 50)
    private String nome;

    @NotBlank(message = "O email é obrigatório")
    @Size(min = 1, max = 50)
    private String email;

    @NotBlank(message = "A senha é obrigatória")
    @Size(min = 6, max = 12)
    private String senha;
}
