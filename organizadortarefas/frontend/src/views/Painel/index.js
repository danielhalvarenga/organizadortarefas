import { useEffect, useState } from "react";

import api from '../../services/api';

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
        <div>
             <ul>
                {tarefas.map(tarefa => (
                    <li key={tarefa.id}>
                        <strong>Titulo:</strong>
                        <p>{tarefa.titulo}</p>
                        <strong>Descrição:</strong>
                        <p>{tarefa.descricao}</p>
                        <strong>Data:</strong>
                        <p>{Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(tarefa.data), 'dd/MM/yyyy HH:mm:ss')}</p>
                        <strong>Concluida:</strong>
                        <p>{tarefa.concluida ? "Sim" : "Não"}</p>
                     </li>
                ))}
            </ul>
        </div>
    );
}

export default Painel;