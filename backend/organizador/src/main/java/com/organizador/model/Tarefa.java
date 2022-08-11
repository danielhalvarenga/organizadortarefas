package com.organizador.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    @NonNull
    private String titulo;

    @Column
    private String descricao;

    @Column
    @NonNull
    private Date data;

    @Column(name = "concluida")
    private boolean isConcluida;
}
