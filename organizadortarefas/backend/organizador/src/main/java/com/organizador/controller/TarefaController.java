package com.organizador.controller;

import com.organizador.dto.TarefaResponse;
import com.organizador.model.Tarefa;
import com.organizador.service.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(tarefas);
    }

    @GetMapping("/concluidas")
    public ResponseEntity<List<Tarefa>> buscarTodasTarefasConcluidas(){
        List<Tarefa> tarefas = service.buscarTodasTarefasConcluidas();
        if(tarefas == null || tarefas.isEmpty()){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(tarefas);
    }

    @GetMapping("/pendentes")
    public ResponseEntity<List<Tarefa>> buscarTodasTarefasPendentes(){
        List<Tarefa> tarefas = service.buscarTodasTarefasPendentes();
        if(tarefas == null || tarefas.isEmpty()){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(tarefas);
    }

    @GetMapping("/vencidas")
    public ResponseEntity<List<Tarefa>> buscarTodasTarefasVencidas(){
        List<Tarefa> tarefas = service.buscarTodasTarefasVencidas();
        if(tarefas == null || tarefas.isEmpty()){
            return ResponseEntity.ok().build();
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
    public ResponseEntity<Tarefa> salvarTarefa(@RequestBody TarefaResponse response){
        String messageError = "";
        if(response == null){
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Preencha os campos para prosseguir.");
        }
        if(response.getTitulo() == null){
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "[Título] não pode ser nulo.");
        }
        if(response.getDescricao() == null){
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "[Descrição] não pode ser nula.");
        }
        if(response.getTitulo() == null){
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "[Data] não pode ser nula.");
        }
        Tarefa tarefa = new Tarefa();
        tarefa.setTitulo(response.getTitulo());
        tarefa.setDescricao(response.getDescricao());
        tarefa.setData(response.getData());
        tarefa.setConcluida(response.isConcluida());

        var model = service.salvarTarefa(tarefa);
        return ResponseEntity.ok(model);
    }

    @PutMapping
    public ResponseEntity<Tarefa> alterarTarefa(@RequestBody TarefaResponse response){
        Tarefa tarefa = new Tarefa();
        tarefa.setTitulo(response.getTitulo());
        tarefa.setDescricao(response.getDescricao());
        tarefa.setData(response.getData());
        tarefa.setConcluida(response.isConcluida());

        var model = service.alterarTarefa(tarefa);
        return ResponseEntity.ok(model);
    }

    @PutMapping("/concluir/{id}")
    public ResponseEntity<Tarefa> concluirTarefa(@PathVariable Long id){
        var model = service.concluirTarefa(id);
        return ResponseEntity.ok(model);
    }

    @PutMapping("/retornar/{id}")
    public ResponseEntity<Tarefa> retornarTarefa(@PathVariable Long id){
        var model = service.retornarTarefa(id);
        return ResponseEntity.ok(model);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletarTarefa(@PathVariable Long id){
        try {
            service.deletarTarefa(id);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            return new ResponseEntity(new Error("Falha ao deletar registro: " + e.getMessage()),
                    HttpStatus.EXPECTATION_FAILED);
        }
    }
}
