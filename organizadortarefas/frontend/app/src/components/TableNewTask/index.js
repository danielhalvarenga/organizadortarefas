import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import api from "../../services/api";
import ColorSelector from "../ColorSelector";

import '../TableNewTask/style.css'
  
function TableNewTask(props) {
  const [camposVazios, setCamposVazios] = useState([]);

  var state = {
    "titulo": "",
    "descricao": "",
    "data": "",
    "concluida": false
  };

  function save(){
    setCamposVazios([]);
    var isCamposNulos = false;
    var mensagem = []
    
    if(state.titulo == null || state.titulo == ''){
      mensagem.push([<><b>[Título] não pode ser nulo.</b><br></br></>]);
      isCamposNulos = true;
    }
    if(state.descricao == null || state.descricao == ''){
      mensagem.push([<><b>[Descrição] não pode ser nula.</b><br></br></>]);
      isCamposNulos = true;
    }
    if(state.data == null || state.data == ''){
      mensagem.push([<><b>[Data] não pode ser nula.</b><br></br></>]);
      isCamposNulos = true;
    }
    
    if(isCamposNulos){
      setCamposVazios(mensagem)
      return;
    }
    
    api.post('/tarefas', {
      "titulo": state.titulo,
      "descricao": state.descricao,
      "data": state.data,
      "concluida": false
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    props.buscarTarefas();
  }

  return (
    <div className="newtask-panel">
      {camposVazios == null || camposVazios == "" ? "" : 
      <div id="danger-alert" className="alert alert-danger" role="alert">
        {camposVazios}
      </div>
      }
      <Form>
        <Form.Group className="mb-3" id="titulo">
          <Form.Label>Título</Form.Label>
          <Form.Control id="titulo" onChange={(e) => state.titulo = e.target.value} type="text" placeholder="Informe um título" />
        </Form.Group>

        <Form.Group className="mb-3" id="descricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control id="descricao" onChange={(e) => state.descricao = e.target.value} as="textarea" rows={3} placeholder="Informe uma descrição" />
        </Form.Group>

        <Form.Group className="mb-3" id="data">
          <Form.Label>Data</Form.Label>
          <Form.Control id="data" onChange={(e) => state.data = e.target.value} type="datetime-local" />
        </Form.Group>

        <Form.Group className="mb-3" id="concluida">
          <Form.Check id="concluida" onChange={(e) => e.target.checked ? state.concluida = true : state.concluida = false} type="checkbox" label="Tarefa concluída" />
        </Form.Group>
        
        <Button className="newbutton" onClick={save} >
          Incluir
        </Button>
      </Form>
    </div>
  );
}

export default TableNewTask;