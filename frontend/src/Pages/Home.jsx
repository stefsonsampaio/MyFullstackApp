import { NavLink } from 'react-router-dom'

function Home() {
    return(
        <div className="container-home-protected">
            <nav className="container-home-buttons">
                <NavLink className="container-home-nav-link" to={`/login`} >Login</NavLink>
                <NavLink className="container-home-nav-link" to={`/cadastro`} >Cadastro</NavLink>
            </nav>
        </div>
    )  
}

export default Home