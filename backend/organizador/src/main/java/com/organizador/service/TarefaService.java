package com.organizador.service;

import com.organizador.model.Tarefa;

import java.util.List;
import java.util.Optional;

public interface TarefaService {
    List<Tarefa> buscarTodasTarefas();

    Optional<Tarefa> buscarTarefaPorId(Long id);

    Tarefa salvarTarefa(Tarefa tarefa);

    Tarefa alterarTarefa(Tarefa tarefa);

    Tarefa concluirTarefa(Long id);
}
