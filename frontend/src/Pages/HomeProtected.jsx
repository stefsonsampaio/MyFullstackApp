import 'react-toastify/dist/ReactToastify.css'
import { NavLink } from 'react-router-dom'

function HomeProtected() {
    const id = localStorage.getItem('id')

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