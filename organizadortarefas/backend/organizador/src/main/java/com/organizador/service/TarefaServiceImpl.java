package com.organizador.service;

import com.organizador.model.Tarefa;
import com.organizador.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TarefaServiceImpl implements TarefaService {

    @Autowired
    private TarefaRepository repository;

    @Override
    public List<Tarefa> buscarTodasTarefas() {
        return repository.findAll();
    }

    @Override
    public List<Tarefa> buscarTodasTarefasConcluidas() {
        return repository.findAllConcluidas();
    }

    @Override
    public List<Tarefa> buscarTodasTarefasPendentes() {
        return repository.findAllPendentes();
    }

    @Override
    public List<Tarefa> buscarTodasTarefasVencidas() {
        return repository.findAllVencidas();
    }

    @Override
    public Optional<Tarefa> buscarTarefaPorId(Long id) {
        return Optional.of(repository.findById(id)).get();
    }

    @Override
    public Tarefa salvarTarefa(Tarefa tarefa) {
        return repository.save(tarefa);
    }

    @Override
    public Tarefa alterarTarefa(Tarefa tarefa) {
        return repository.save(tarefa);
    }

    @Override
    public Tarefa concluirTarefa(Long id) {
        Tarefa tarefa = buscarTarefaPorId(id).get();
        tarefa.setConcluida(true);
        alterarTarefa(tarefa);
        return tarefa;
    }

    @Override
    public Tarefa retornarTarefa(Long id) {
        Tarefa tarefa = buscarTarefaPorId(id).get();
        tarefa.setConcluida(false);
        alterarTarefa(tarefa);
        return tarefa;
    }

    @Override
    public void deletarTarefa(Long id) throws Exception {
        repository.delete(buscarTarefaPorId(id).get());
    }
}
