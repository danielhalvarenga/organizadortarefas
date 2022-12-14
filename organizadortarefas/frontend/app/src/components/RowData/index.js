import checkIcon from "../../icons/check-circle-fill.svg";
import tashIcon from "../../icons/trash-fill.svg";
import returnIcon from "../../icons/arrow-counterclockwise.svg";
import alterIcon from "../../icons/caneta.png"

import api from "../../services/api";

import '../RowData/style.css'

function RowData(props) {

  function alertExclusaoRegistro(){
    let message = 'Caso prossiga com a exclusão o registro não poderá ser recuperado.';
    return !window.confirm(message);
  }

  async function deletarTarefa(id) {

    if(alertExclusaoRegistro()){
      return;
    }    

    api.delete('/tarefas/' + id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      props.carregarTarefaConcluida();
  }

  async function concluirTarefa(id){
    api.put('/tarefas/concluir/' + id)
      .catch(function (error) {
        console.log(error);
      });
      props.carregarTarefaConcluida();
  }

  async function retornarTarefa(id){
    api.put('/tarefas/retornar/' + id)
      .catch(function (error) {
        console.log(error);
      });
      props.carregarTarefaConcluida();
  }

  function alterarTarefa(id){
    props.alterarTarefa(id)
  }

  function getColorBorder(idPrioridade){
    if(idPrioridade === 'A'){
      return 'red'
    }
    if(idPrioridade === 'M'){
      return 'yellow'
    }
    if(idPrioridade === 'B'){
      return 'green'
    }
  }

  return (
    <li key={props.tarefa.id}>
      <div className="row-task container row"  style={{'borderColor' : getColorBorder(props.tarefa.prioridade.id)}}>
        <div className="col-md-2 group-button">
          {props.tarefa.concluida ? 
          <div>
            <button onClick={() => retornarTarefa(props.tarefa.id)} type="button">
              <img src={returnIcon} />
            </button>
          </div>
          : 
            <div>
              <button onClick={() => concluirTarefa(props.tarefa.id)} type="button">
                <img src={checkIcon} />
              </button>
            </div>
          }
          <div>
            <button onClick={() => alterarTarefa(props.tarefa.id)} type="button">
              <img style={{"width" : "16px"}} src={alterIcon} />
            </button>
          </div>
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