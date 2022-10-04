package com.organizador.service;

import com.organizador.model.Tarefa;

import java.util.List;
import java.util.Optional;

public interface TarefaService {
    List<Tarefa> buscarTodasTarefas();

    List<Tarefa> buscarTodasTarefasConcluidas();

    List<Tarefa> buscarTodasTarefasPendentes();

    List<Tarefa> buscarTodasTarefasVencidas();

    Optional<Tarefa> buscarTarefaPorId(Long id);

    Tarefa salvarTarefa(Tarefa tarefa);

    Tarefa alterarTarefa(Tarefa tarefa);

    Tarefa concluirTarefa(Long id);

    Tarefa retornarTarefa(Long id);

    void deletarTarefa(Long id) throws Exception;
}
