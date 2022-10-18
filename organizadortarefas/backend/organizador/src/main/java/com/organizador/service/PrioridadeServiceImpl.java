package com.organizador.service;

import com.organizador.model.Prioridade;
import com.organizador.repository.PrioridadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrioridadeServiceImpl implements PrioridadeService {

    @Autowired
    private PrioridadeRepository repository;

    @Override
    public List<Prioridade> buscarPrioridadesDisponiveis() {
        return repository.findAll();
    }

    @Override
    public Prioridade buscarPorId(String idPrioridade) {
        return repository.findById(idPrioridade).get();
    }
}
