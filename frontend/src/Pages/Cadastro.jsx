import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Cadastro() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const fnConfirmar = async (event) => {
        event.preventDefault()

        const urlrest = `${process.env.REACT_APP_BACKEND_URL}/cadastro`

        try {
            await axios.post(urlrest, {
                username,
                password
            })

            navigate('/')
            window.location.reload()
        } catch (error) {
            console.log("Error: ", error.message)
            navigate('/')
        }
    }

    const fnCancelar = (event) => {
        event.preventDefault()
        navigate('/')
    }

    return (
        <div className="container-cadastro">
            <form className="form-cadastro">
                <h1>{`</cadastro>`}</h1>
                <label>Usuário</label>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Senha</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="buttons">
                    <button className="button-confirmar" onClick={(event) => fnConfirmar(event)}>Cadastrar</button>
                    <button className="button-cancelar" onClick={(event) => fnCancelar(event)}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default Cadastro
