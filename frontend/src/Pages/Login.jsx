import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import showToast from '../components/Toast'

function Login() {
    const navigate = useNavigate()

    const fnConfirmar = async (event) => {
        event.preventDefault()

        const username = event.target.form.username.value
        const password = event.target.form.password.value
        const urlrest = `${process.env.REACT_APP_BACKEND_URL}/login`

        try {
            const response = await axios.post(urlrest, {
                username,
                password
            })
            const jsonlogin = response.data

            if (jsonlogin.token) {
                localStorage.setItem('token', jsonlogin.token)
                localStorage.setItem('id', jsonlogin.usuario.id_usuario)
                localStorage.setItem('nome', jsonlogin.usuario.usuario)
                navigate(`/atendimento/${jsonlogin.usuario.id_usuario}?loginSuccess=true`)
                window.location.reload()
            }
            
        } catch (error) {
            console.log("Error: ", error.message)
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token')
                navigate('/login')
                showToast('Usuário ou senha incorretos', 'error')
            }
            if (error.response && error.response.status === 400) {
                localStorage.removeItem('token')
                navigate('/login')
                showToast('Usuário ou senha não informados', 'error')
            }      
        }
    }

    const fnCancelar = (event) => {
        event.preventDefault()
        navigate('/')
    }

    return(
        <div className="container-login">
            <form className="form-login">
                <h1>{`</login>`}</h1>
                <label>Usuário</label>
                <input type="text" name="username"/>
                <label>Senha</label>
                <input type="password" name="password"/>
                <div className="buttons">
                    <button className="button-confirmar" onClick={(event) => fnConfirmar(event)}>Confirmar</button>
                    <button className="button-cancelar" onClick={(event) => fnCancelar(event)}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default Login