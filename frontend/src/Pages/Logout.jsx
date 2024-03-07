import { useNavigate } from "react-router-dom"

function Logout() {
    const navigate = useNavigate()
    const id = localStorage.getItem('id')
    const val = localStorage.getItem('val')

    
    if (id === null) {
        localStorage.clear()
        navigate('/')
    }
    
    if (!val) {
        navigate(`/usuario-barrado/${id}`)
    }

    const fnLogout = async (event) => {
        event.preventDefault()
        localStorage.clear()
        navigate('/')
        window.location.reload()
    }

    const fnCancel = async (event) => {
        event.preventDefault()
        navigate('/home')
    }

    return(
        <div className="container-logout">
            <form className="form-logout">
                <h1>{`</Logout>`}</h1>
                <h2>Tem certeza que deseja sair?</h2>
                <div className="buttons">
                    <button className="button-confirmar" onClick={(event) => fnLogout(event)}>Confirmar</button>
                    <button className="button-cancelar" onClick={(event) => fnCancel(event)}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default Logout