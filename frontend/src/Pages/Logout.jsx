import { useNavigate } from "react-router-dom"

function Logout() {
    const navigate = useNavigate()

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
                <div className="buttons">
                    <button className="button-confirmar" onClick={(event) => fnLogout(event)}>Confirmar</button>
                    <button className="button-cancelar" onClick={(event) => fnCancel(event)}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default Logout