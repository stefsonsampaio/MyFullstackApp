import { NavLink } from 'react-router-dom'

function Footer() {
    const id = localStorage.getItem('id')
    return(
        <div className="container-footer">
            <nav className="nav-bar">
                {
                    localStorage.getItem('token') === null
                    
                    ?
                    <>
                    <h1>footer</h1>
                    </>
                    :
                    <>
                    <NavLink  to={`/dashboards/${id}`}>Dashboards</NavLink>
                    </>
                }
            </nav>
        </div>
    )
}

export default Footer