import { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Form } from "react-bootstrap";
import api from "../../services/api";

import '../TableNewTask/style.css'

import SelectPrioridade from "../SelectPrioridade";
import ErrorMessage from "../ErrorMessage";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale } from  "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
registerLocale('pt-BR', pt)

const TableNewTask = forwardRef((props, ref) => {
  var camposNulos = [];
  const [camposVazios, setCamposVazios] = useState();
  
  // variaveis armazenadas para persistencia de dados
  const [id, setIdPersistence] = useState(null);
  const [titulo, setTituloPersistence] = useState();
  const [descricao, setDescricaoPersistence] = useState();
  const [data, setDataPersistence] = useState(new Date());
  const [concluida, setConcluidaPersistence] = useState(false);
  const [prioridade, setPrioridadePersistence] = useState("M");

  async function alterData(id){
    const response = await api.get('/tarefas/' + id);
    if(response == null){
      return;
    }
    setIdPersistence(id)
    setTituloPersistence(response.data.titulo);
    setDescricaoPersistence(response.data.descricao);
    setDataPersistence(response.data.data);
    setConcluidaPersistence(response.data.concluida);
    setPrioridadePersistence(response.data.prioridade);
  }

  useImperativeHandle(ref, () => ({
    limparMeuComponente: (id) => alterData(id),
  }));

  function save(){
    setCamposVazios()
    camposNulos = []

    if(titulo == null || titulo === ''){
      camposNulos.push("[Título] não pode ser nulo");
    }
    if(descricao == null || descricao === ''){
      camposNulos.push("[Descrição] não pode ser nula")
    }
    if(data == null || data === ''){
      camposNulos.push("[Data] não pode ser nula")
    }
    if(prioridade == null || prioridade === ''){
      camposNulos.push("[Prioridade] não pode ser nula")
    }

    if(camposNulos != null && camposNulos.length !== 0){
      setCamposVazios(camposNulos)
      return;
    }

    if(id != null){
      api.put('/tarefas', {
        "id": id,
        "titulo": titulo,
        "descricao": descricao,
        "data": data,
        "concluida": concluida,
        "idPrioridade": prioridade
      })
      .then(function(response){
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
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
          <Form.Control value={titulo} id="titulo" onChange={(e) => setTituloPersistence(e.target.value)} type="text" placeholder="Informe um título" />
        </Form.Group>

        <Form.Group className="mb-3" id="descricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control value={descricao} id="descricao" onChange={(e) => setDescricaoPersistence(e.target.value)} as="textarea" rows={3} placeholder="Informe uma descrição" />
        </Form.Group>

        <Form.Group className="mb-3" id="data">
          <Form.Label>Data</Form.Label>
          <DatePicker
            className="form-control"
            selected={data}
            onChange={(date) => setDataPersistence(date)}
            locale="pt-BR"
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="Pp"
          />
        </Form.Group>

        <Form.Group className="mb-3" id="concluida">
          <Form.Check value={concluida} id="concluida" onChange={(e) => e.target.checked ? setConcluidaPersistence(true) : setConcluidaPersistence(false)} type="checkbox" label="Tarefa concluída" />
        </Form.Group>
        
        <Form.Group className="mb-3" id="concluida">
          <Form.Label>Prioridade</Form.Label>
          <SelectPrioridade valuePrioridade={prioridade} setPrioridade={setPrioridade}/>
        </Form.Group>

        <Button className="newbutton" onClick={save} >
          {id == null ? "Incluir" : "Alterar"}
        </Button>
      </Form>
    </div>
  );
})

export default TableNewTask;