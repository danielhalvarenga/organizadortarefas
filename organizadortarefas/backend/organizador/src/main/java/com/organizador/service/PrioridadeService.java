package com.organizador.service;

import com.organizador.model.Prioridade;

import java.util.List;

public interface PrioridadeService {

    List<Prioridade> buscarPrioridadesDisponiveis();

    Prioridade buscarPorId(String idPrioridade);
}
