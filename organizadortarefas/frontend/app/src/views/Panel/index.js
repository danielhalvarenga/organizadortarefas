import { render } from "@testing-library/react";
import { useEffect, useState } from "react";
import RowData from "../../components/RowData";
import TableNewTask from "../../components/TableNewTask";

import api from '../../services/api';

import '../Panel/style.css'

function Painel() {
  const [tarefas, setTarefas] = useState([]);

  async function buscarTarefas() {
    setTarefas(null)
    const response = await api.get('/tarefas');
    setTarefas([...tarefas, ...response.data])
  }

  function recarregarTarefas(id) {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id))
  }

  function carregarTarefaConcluida() {
    window.location.reload();
  }

  useEffect(() => {
    buscarTarefas()
  }, [])
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 title">
          <h3>Tarefas</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <TableNewTask buscarTarefas={buscarTarefas}/>
        </div>
        <div className="col-md-8 task">
          <ul>
            {tarefas == null || tarefas.length === 0 ? <p>Não existem tarefas cadastradas...</p> :
              tarefas.map(tarefa => (
                <RowData carregarTarefaConcluida={carregarTarefaConcluida} recarregarTarefas={recarregarTarefas} tarefa={tarefa} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Painel;