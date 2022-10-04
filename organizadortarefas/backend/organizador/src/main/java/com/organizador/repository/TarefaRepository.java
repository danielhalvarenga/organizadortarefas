package com.organizador.repository;

import com.organizador.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

    @Query("SELECT tarefas FROM Tarefa tarefas WHERE isConcluida = TRUE ORDER BY DATA")
    List<Tarefa> findAllConcluidas();

    @Query("SELECT tarefas FROM Tarefa tarefas WHERE isConcluida = FALSE AND DATA > CURRENT_DATE  ORDER BY DATA")
    List<Tarefa> findAllPendentes();

    @Query("SELECT tarefas FROM Tarefa tarefas WHERE isConcluida = FALSE AND DATA < CURRENT_DATE ORDER BY DATA")
    List<Tarefa> findAllVencidas();

}
