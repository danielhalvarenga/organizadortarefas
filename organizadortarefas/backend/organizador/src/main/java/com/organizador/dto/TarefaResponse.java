package com.organizador.dto;

import lombok.Data;

import java.util.Date;

@Data
public class TarefaResponse {

    private Long id;
    private String titulo;
    private String descricao;
    private Date data;
    private boolean isConcluida;
    private String idPrioridade;
}
