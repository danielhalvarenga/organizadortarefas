import { useEffect, useState } from "react";
import api from "../../services/api";

import '../SelectPrioridade/style.css'

function SelectPrioridade(props) {
  const [prioridades, setPrioridades] = useState([]);

  useEffect(() => {
    buscarPrioridades();
  }, [])


  async function buscarPrioridades(){
    const response = await api.get('/prioridades');
    setPrioridades([...prioridades, ...response.data]);
  }

  return (
    <select value={props.valuePrioridade != null ? props.valuePrioridade : "M"} onChange={e => props.setPrioridade(e.target.value)} className="select">
      {prioridades.map((a) => ( 
          <option value={a.id}>{a.nome}</option>
      ))}
    </select>
  );
}

export default SelectPrioridade;