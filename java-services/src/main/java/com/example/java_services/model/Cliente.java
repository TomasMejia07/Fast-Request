package com.example.java_services.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clientes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column(name = "NombreCliente", length = 100, nullable = false)
    private String NombreCliente;

    @Column(name = "CorreoElectronico", length = 100, nullable = false, unique = true)
    private String correoElectronico;

    @Column(name = "NumeroContacto", length = 30, nullable = false)
    private String NumeroContacto;

    @Column(name = "Contrasena", length = 100, nullable = false)
    private String Contrasena;

    @Column(name = "EstadoCliente", nullable = false)
    private String EstadoCliente = "activo";
}
