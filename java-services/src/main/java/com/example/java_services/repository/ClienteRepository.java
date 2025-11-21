package com.example.java_services.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.java_services.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    boolean existsByCorreoElectronico(String correoElectronico);
}
