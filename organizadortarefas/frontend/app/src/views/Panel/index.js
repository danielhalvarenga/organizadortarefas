import { useEffect, useState } from "react";
import TableNewTask from "../../components/TableNewTask";
import checkIcon from "../../icons/check-circle-fill.svg";
import tashIcon from "../../icons/trash-fill.svg"

import api from '../../services/api';

import '../Panel/style.css'

function Painel(){
    const [tarefas, setTarefas] = useState([]);

    async function buscarTarefas(){
      const response = await api.get('/tarefas');
      setTarefas([... tarefas, ...response.data])
    }

    useEffect(() => {
      buscarTarefas()
    }, [])

    return(
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>Tarefas</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <TableNewTask/>
            </div>
            <div className="col-md-9 task">
              <ul>
                  {tarefas == null || tarefas.length === 0 ? <p>Não existem tarefas cadastradas...</p> :
                    tarefas.map(tarefa => (
                      <li key={tarefa.id}>
                          <div className="row-task container row">
                          <div className="col-md-2">
                              <div>
                                <img src={checkIcon}/>
                              </div>
                              <div>
                                <img src={tashIcon}/>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <strong>Titulo:</strong>
                              <p>{tarefa.titulo}</p>
                              <strong>Descrição:</strong>
                              <p>{tarefa.descricao}</p>
                            </div>
                            <div className="col-md-4">
                              <strong>Data:</strong>
                              <p>{Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(tarefa.data), 'dd/MM/yyyy HH:mm:ss')}</p>
                              <strong>Concluida:</strong>
                              <p>{tarefa.concluida ? "Sim" : "Não"}</p>
                            </div>
                          </div>
                      </li>
                  ))}
              </ul>
            </div>
          </div>  
        </div>
    );
}

export default Painel;