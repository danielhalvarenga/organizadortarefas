package com.organizador.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "prioridade")
@Data
@NoArgsConstructor
public class Prioridade {

    @Id
    @Column(length = 2)
    String id;

    @Column(nullable = false)
    String nome;
}