import { useState } from "react";

import { Button, Form } from "react-bootstrap";
import api from "../../services/api";

function TableNewTask() {
  const [date, setDate] = useState(new Date());

  var state = {
    "titulo": "",
    "descricao": "",
    "data": new Date(),
    "concluida": false
  };

  function save(){   
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
  }

  return (
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
        <Form.Control value={date} id="data" onChange={(e) => state.data = e.target.value} type="datetime-local" />
      </Form.Group>

      <Form.Group className="mb-3" id="concluida">
        <Form.Check id="concluida" onChange={(e) => e.target.checked ? state.concluida = true : state.concluida = false} type="checkbox" label="Tarefa concluída" />
      </Form.Group>
      
      <Button href="/" type="submit" onClick={save} >
        Incluir
      </Button>
    </Form>
  );
}

export default TableNewTask;