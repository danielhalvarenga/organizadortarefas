package com.organizador.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private Date data;

    @Column(name = "concluida", nullable = false)
    private boolean isConcluida;

    @ManyToOne
    @JoinColumn(name = "prioridade_id")
    private Prioridade prioridade;
}
