import { useEffect, useState } from "react";
import RowData from "../../components/RowData";
import TableNewTask from "../../components/TableNewTask";

import api from '../../services/api';

import '../Panel/style.css'

function Painel() {
  const [tarefasPendentes, setTarefasPendentes] = useState([]);
  const [tarefasConcluidas, setTarefasConcluidas] = useState([]);
  const [tarefasVencidas, setTarefasVencidas] = useState([]);

  async function buscarTarefasPendentes() {
    setTarefasPendentes([])
    const response = await api.get('/tarefas/pendentes');
    setTarefasPendentes([...tarefasPendentes, ...response.data])
  }

  async function buscarTarefasVencidas() {
    setTarefasVencidas([])
    const response = await api.get('/tarefas/vencidas');
    setTarefasVencidas([...tarefasVencidas, ...response.data])
  }

  async function buscarTarefasConcluidas() {
    setTarefasConcluidas([])
    const response = await api.get('/tarefas/concluidas');
    setTarefasConcluidas([...tarefasConcluidas, ...response.data])
  }

  function recarregarTarefas(id) {
    setTarefasPendentes(tarefasPendentes.filter(tarefa => tarefa.id !== id))
  }

  function carregarTarefaConcluida() {
    window.location.reload();
  }

  useEffect(() => {
    buscarTarefasPendentes()
    buscarTarefasVencidas()
    buscarTarefasConcluidas()
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
          <TableNewTask buscarTarefas={buscarTarefasPendentes}/>
        </div>
        <div className="col-md-8 task">
          <div className="row-status" style={{'color' : 'green'}}>
            Tarefas concluídas
          </div>
          <ul>
            {tarefasConcluidas == null || tarefasConcluidas.length === 0 ? <p>Não existem tarefas concluídas...</p> :
              tarefasConcluidas.map(tarefa => (
                <RowData carregarTarefaConcluida={carregarTarefaConcluida} recarregarTarefas={recarregarTarefas} tarefa={tarefa} />
              ))}
          </ul>
          {
          tarefasVencidas == null || tarefasVencidas.length === 0 ? "" : 
          <>
            <div className="row-status" style={{'color' : 'red'}}>
              Tarefas vencidas
            </div>
            <ul>
            {tarefasVencidas == null || tarefasVencidas.length === 0 ? "" :
              tarefasVencidas.map(tarefa => (
                <RowData carregarTarefaConcluida={carregarTarefaConcluida} recarregarTarefas={recarregarTarefas} tarefa={tarefa} />
              ))}
            </ul>
          </>
          }
          
          <div className="row-status">
            Tarefas pendentes
          </div>
          <ul>
            {tarefasPendentes == null || tarefasPendentes.length === 0 ? <p>Não existem tarefas pendentes...</p> :
              tarefasPendentes.map(tarefa => (
                <RowData carregarTarefaConcluida={carregarTarefaConcluida} recarregarTarefas={recarregarTarefas} tarefa={tarefa} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Painel;