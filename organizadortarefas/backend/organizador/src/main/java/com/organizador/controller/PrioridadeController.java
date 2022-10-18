package com.organizador.controller;

import com.organizador.model.Prioridade;
import com.organizador.service.PrioridadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/prioridades")
public class PrioridadeController {

    @Autowired
    private PrioridadeService service;

    @GetMapping
    public List<Prioridade> buscarPrioridadesDisponiveis(){
        List<Prioridade> prioridades = service.buscarPrioridadesDisponiveis();
        return prioridades;
    }
}
