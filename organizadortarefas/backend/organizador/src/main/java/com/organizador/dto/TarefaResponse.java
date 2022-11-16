package com.organizador.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class TarefaResponse {

    private Long id;
    private String titulo;
    private String descricao;
    private LocalDateTime data;
    private boolean isConcluida;
    private String idPrioridade;
}
