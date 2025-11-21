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
    private Integer id;

    @Column(name = "NombreCliente", length = 100, nullable = false)
    private String nombreCliente;

    @Column(name = "CorreoElectronico", length = 100, nullable = false, unique = true)
    private String correoElectronico;

    @Column(name = "NumeroContacto", length = 30, nullable = false)
    private String numeroContacto;

    @Column(name = "Contrasena", length = 100, nullable = false)
    private String contrasena;

    @Column(name = "EstadoCliente", nullable = false)
    private String estadoCliente = "activo";
}
