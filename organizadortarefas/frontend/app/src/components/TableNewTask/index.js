import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import api from "../../services/api";

import '../TableNewTask/style.css'
  
function TableNewTask(props) {
  const [camposVazios, setCamposVazios] = useState([]);

  var state = {
    "titulo": null,
    "descricao": null,
    "data": null,
    "concluida": false
  };

  function save(){
    setCamposVazios([]);
    api.post('/tarefas', {
      "titulo": state.titulo != null ? state.titulo : null,
      "descricao": state.descricao != null ? state.descricao : null,
      "data": state.data != null ? state.data : null,
      "concluida": state.concluida
    })
    .then(function(response){
      window.location.reload();
    })
    .catch(function (error) {
      if(error != null && error.response != null 
        && error.response.data != null && error.response.data.message != null){
        setCamposVazios(error.response.data.message)
      }
    });
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