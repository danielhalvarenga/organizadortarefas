package com.organizador.repository;

import com.organizador.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

    static final String ORDER_BY_PRIORIDADE = ", PRIORIDADE_CASE";
    static final String CASE_PRIORIDADE = "(CASE " +
            "WHEN tarefa.prioridade.id = 'A' THEN 1 " +
            "WHEN tarefa.prioridade.id = 'M' THEN 2 " +
            "WHEN tarefa.prioridade.id = 'B' THEN 3 " +
            "END) AS PRIORIDADE_CASE ";

    @Query( "SELECT tarefa, "
            + CASE_PRIORIDADE +
            " FROM Tarefa tarefa WHERE isConcluida = TRUE ORDER BY DATA"
            + ORDER_BY_PRIORIDADE)
    List<Tarefa> findAllConcluidas();

    @Query("SELECT tarefa, "
            + CASE_PRIORIDADE +
            " FROM Tarefa tarefa WHERE isConcluida = FALSE AND DATA > CURRENT_TIMESTAMP ORDER BY DATA"
            + ORDER_BY_PRIORIDADE)
    List<Tarefa> findAllPendentes();

    @Query("SELECT tarefa, "
            + CASE_PRIORIDADE +
            " FROM Tarefa tarefa WHERE isConcluida = FALSE AND DATA < CURRENT_TIMESTAMP ORDER BY DATA"
            + ORDER_BY_PRIORIDADE)
    List<Tarefa> findAllVencidas();

}
