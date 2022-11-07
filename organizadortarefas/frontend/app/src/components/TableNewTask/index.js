import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import api from "../../services/api";

import '../TableNewTask/style.css'

import SelectPrioridade from "../SelectPrioridade";
import ErrorMessage from "../ErrorMessage";

function TableNewTask() {
  var camposNulos = [];
  const [camposVazios, setCamposVazios] = useState();
  
  // variaveis armazenadas para persistencia de dados
  const [titulo, setTituloPersistence] = useState();
  const [descricao, setDescricaoPersistence] = useState();
  const [data, setDataPersistence] = useState(new Date());
  const [concluida, setConcluidaPersistence] = useState(false);
  const [prioridade, setPrioridadePersistence] = useState("M");

  function save(){
    setCamposVazios()
    camposNulos = []

    if(titulo == null || titulo == ''){
      camposNulos.push("[Título] não pode ser nulo");
    }
    if(descricao == null || descricao == ''){
      camposNulos.push("[Descrição] não pode ser nula")
    }
    if(data == null || data == ''){
      camposNulos.push("[Data] não pode ser nula")
    }
    if(prioridade == null || prioridade == ''){
      camposNulos.push("[Prioridade] não pode ser nula")
    }

    if(camposNulos != null || camposNulos.lenght != 0){
      setCamposVazios(camposNulos)
      return;
    }

    api.post('/tarefas', {
      "titulo": titulo,
      "descricao": descricao,
      "data": data,
      "concluida": concluida,
      "idPrioridade": prioridade
    })
    .then(function(response){
      //setTarefasPendentes(tarefasPendentes.filter(tarefa => tarefa.id !== id))
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function setPrioridade(id){
    setPrioridadePersistence(id);
  }

  return (
    <div className="newtask-panel">
      <ErrorMessage camposNulos={camposVazios}/>

      <Form>
        <Form.Group className="mb-3" id="titulo">
          <Form.Label>Título</Form.Label>
          <Form.Control id="titulo" onChange={(e) => setTituloPersistence(e.target.value)} type="text" placeholder="Informe um título" />
        </Form.Group>

        <Form.Group className="mb-3" id="descricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control id="descricao" onChange={(e) => setDescricaoPersistence(e.target.value)} as="textarea" rows={3} placeholder="Informe uma descrição" />
        </Form.Group>

        <Form.Group className="mb-3" id="data">
          <Form.Label>Data</Form.Label>
          <Form.Control id="data" onChange={(e) => setDataPersistence(e.target.value)} type="datetime-local" />
        </Form.Group>

        <Form.Group className="mb-3" id="concluida">
          <Form.Check id="concluida" onChange={(e) => setConcluidaPersistence(e.target.checked ? setConcluidaPersistence(true) : setConcluidaPersistence(false))} type="checkbox" label="Tarefa concluída" />
        </Form.Group>
        
        <Form.Group className="mb-3" id="concluida">
          <Form.Label>Prioridade</Form.Label>
          <SelectPrioridade setPrioridade={setPrioridade}/>
        </Form.Group>

        <Button className="newbutton" onClick={save} >
          Incluir
        </Button>
      </Form>
    </div>
  );
}

export default TableNewTask;