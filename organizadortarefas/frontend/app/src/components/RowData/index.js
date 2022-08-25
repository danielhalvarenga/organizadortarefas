import checkIcon from "../../icons/check-circle-fill.svg";
import tashIcon from "../../icons/trash-fill.svg"

import api from "../../services/api";

function RowData(props) {

  async function deletarTarefa(id) {
    api.delete('/tarefas/' + id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      props.recarregarTarefas(id);
  }

  async function concluirTarefa(id){
    api.put('/tarefas/concluir/' + id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      props.carregarTarefaConcluida();
  }

  return (
    <li key={props.tarefa.id}>
      <div className="row-task container row">
        <div className="col-md-2">
          {props.tarefa.concluida ? '' : 
            <div>
              <button onClick={() => concluirTarefa(props.tarefa.id)} type="button">
                <img src={checkIcon} />
              </button>
            </div>
          }
          <div>
            <button onClick={() => deletarTarefa(props.tarefa.id)} type="button">
              <img src={tashIcon} />
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <strong>Titulo:</strong>
          <p>{props.tarefa.titulo}</p>
          <strong>Descrição:</strong>
          <p>{props.tarefa.descricao}</p>
        </div>
        <div className="col-md-4">
          <strong>Data:</strong>
          <p>{Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(props.tarefa.data), 'dd/MM/yyyy HH:mm:ss')}</p>
          <strong>Concluida:</strong>
          <p>{props.tarefa.concluida ? "Sim" : "Não"}</p>
        </div>
      </div>
    </li>
  );
}

export default RowData;