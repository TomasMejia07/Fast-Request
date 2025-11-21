package com.example.java_services.service;

import com.example.java_services.model.Cliente;
import com.example.java_services.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository repo;

    public ClienteService(ClienteRepository repo) {
        this.repo = repo;
    }

    public List<Cliente> findAll() {
        return repo.findAll();
    }

    public Cliente findById(Integer id) {
        return repo.findById(id).orElse(null);
    }

    public Cliente create(Cliente cliente) {
        return repo.save(cliente);
    }

    public Cliente update(Integer id, Cliente data) {
        Cliente c = repo.findById(id).orElse(null);
        if (c == null) return null;

        c.setNombreCliente(data.getNombreCliente());
        c.setCorreoElectronico(data.getCorreoElectronico());
        c.setNumeroContacto(data.getNumeroContacto());
        c.setContrasena(data.getContrasena());
        c.setEstadoCliente(data.getEstadoCliente());

        return repo.save(c);
    }

    public boolean delete(Integer id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
