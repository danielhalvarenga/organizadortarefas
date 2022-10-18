package com.organizador.repository;

import com.organizador.model.Prioridade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrioridadeRepository extends JpaRepository<Prioridade, String> {

    @Query("SELECT p FROM \n" +
            "prioridade as p \n" +
            "order by CASE WHEN p.id = 'A' THEN 1 WHEN p.id = 'M' THEN 2 ELSE 3 END")
    @Override
    List<Prioridade> findAll();
}
