function ErrorMessage(props){
    function renderRow(row){
        if(row === null || row === undefined){
            return null;
        }
        return <li>{row}</li>
    }

    return(
        <>
        {props.camposNulos == null || props.camposNulos.length === 0 ? '' :
        <div id="danger-alert" className="alert alert-danger" role="alert">
            {props.camposNulos.map((person) => (
                renderRow(person)
            ))}
        </div>
        }
        </>
    )
}

export default ErrorMessage;