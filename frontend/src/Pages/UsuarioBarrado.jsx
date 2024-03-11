import { NavLink, useNavigate, useParams } from 'react-router-dom'

function UsuarioBarrado() {
    const navigate = useNavigate()
    const { id } = useParams()

    if (id === null) {
        localStorage.clear()
        navigate('/')
    }

    const clearStorage = () => {
        localStorage.clear()
        
        window.location.href('/')
    }

    return(
        <div className="container-usuario-barrado">
            <form className="form-usuario-barrado">
                <h1>Seu usuário está temporariamente bloqueado</h1>
                <p>Entre em contato com o administrador do site para revalidar seu acesso</p>
                <nav className="container-home-buttons">
                    <NavLink className="container-home-nav-link" to={`/login`} onClick={clearStorage()}>Voltar para Login</NavLink>
                </nav>
            </form>
        </div>
    )
}

export default UsuarioBarrado