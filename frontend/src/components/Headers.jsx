import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    const id = localStorage.getItem('id')
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }
    
    const closeMenu = () => {
        setMenuOpen(false)
    }
    
    return (
        <div className="container-header">
            <NavLink to='/' className='logo'>{`</myBarbershop>`}</NavLink>
            {localStorage.getItem('token') === null ? (
                <nav className="nav-bar">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                    <NavLink className="nav-link" to="/cadastro">Cadastro</NavLink>
                </nav>
            ) : (
                <>
                    <div className="menu-button" onClick={toggleMenu}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </div>
                    <nav className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
                        <NavLink className="nav-link" to={`/atendimento/${id}`} onClick={closeMenu}>Atendimentos</NavLink>
                        <NavLink className="nav-link" to={`/cadastra-funcionario/${id}`} onClick={closeMenu}>Cadastro Funcionário</NavLink>
                        <NavLink className="nav-link" to={`/cadastra-servico/${id}`} onClick={closeMenu}>Cadastro Serviço</NavLink>
                        <NavLink className="nav-link" to="/logout" onClick={closeMenu}>Logout</NavLink>
                    </nav>
                </>
            )}
        </div>
    )
    
}

export default Header
