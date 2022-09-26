import '../ColorSelector/style.css'

function ColorSelector(props) {

  return (
    <div>
      <input type="color" id="cores" name="ArcoIris" list="arcoIris" value="#FF0000"/>
      <datalist id="arcoIris">
        <option value="#FF0000">Vermelho</option>
        <option value="#FFA500">Laranja</option>
        <option value="#FFFF00">Amarelo</option>
        <option value="#008000">Verde</option>
        <option value="#0000FF">Azul</option>
        <option value="#4B0082">Indigo</option>
        <option value="#EE82EE">Violeta</option>
      </datalist>
    </div>
  );
}

export default ColorSelector;