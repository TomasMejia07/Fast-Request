package com.example.javaservices.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.javaservices.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    boolean existsByCorreoElectronico(String correoElectronico);
}
