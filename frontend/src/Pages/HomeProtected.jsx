import 'react-toastify/dist/ReactToastify.css'
import { NavLink, useNavigate } from 'react-router-dom'

function HomeProtected() {
    const navigate = useNavigate()
    const id = localStorage.getItem('id')

    if (id === null) {
        localStorage.clear()
        navigate('/')
    }

    return(
        <div className="container-home-protected">
            <nav className="container-home-buttons">
                <NavLink className="container-home-nav-link" to={`/atendimento/${id}`} >Atendimentos</NavLink>
                <NavLink className="container-home-nav-link" to={`/cadastra-funcionario/${id}`} >Funcionários</NavLink>
                <NavLink className="container-home-nav-link" to={`/cadastra-servico/${id}`} >Serviços</NavLink>
                <NavLink className="container-home-nav-link" to={`/dashboards/${id}`} >Dashboards</NavLink>
            </nav>
        </div>
    )  
}

export default HomeProtected