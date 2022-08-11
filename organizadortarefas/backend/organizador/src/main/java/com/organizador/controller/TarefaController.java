package com.organizador.controller;

import com.organizador.model.Tarefa;
import com.organizador.service.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    @Autowired
    private TarefaService service;

    @GetMapping
    public ResponseEntity<List<Tarefa>> buscarTodasTarefas(){
        List<Tarefa> tarefas = service.buscarTodasTarefas();
        if(tarefas == null || tarefas.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(tarefas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> buscarTarefaPorId(@PathVariable Long id){
        Optional<Tarefa> tarefa = service.buscarTarefaPorId(id);
        if(!tarefa.isPresent()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(tarefa.get());
    }

    @PostMapping
    public ResponseEntity<Tarefa> salvarTarefa(@RequestBody Tarefa tarefa){
        var model = service.salvarTarefa(tarefa);
        return ResponseEntity.ok(model);
    }

    @PutMapping
    public ResponseEntity<Tarefa> alterarTarefa(@RequestBody Tarefa tarefa){
        var model = service.alterarTarefa(tarefa);
        return ResponseEntity.ok(model);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> concluirTarefa(@PathVariable Long id){
        var model = service.concluirTarefa(id);
        return ResponseEntity.ok(model);
    }
}