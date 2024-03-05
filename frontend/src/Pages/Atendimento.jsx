import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import showToast from '../components/Toast'

function Atendimento() {
    const { id } = useParams()
    const [selectedFuncionario, setSelectedFuncionario] = useState('')
    const [clientName, setClientName] = useState('')
    const [selectedService, setSelectedService] = useState('')
    const [atendimentos, setAtendimentos] = useState([])
    const [funcionarios, setFuncionarios] = useState([])
    const [servicos, setServicos] = useState([])
    const navigate = useNavigate()

    // Função para listar atendimentos
    const listaAtendimentos = async () => {
        try {
            const url = `${process.env.BACKEND_URL}/login/${id}/lista-servico`
            const token = localStorage.getItem('token')

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const jsonresponse = response.data

            setAtendimentos(jsonresponse)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Error: ', error.message)
                showToast('Erro na requisição!', 'error')
                navigate('/')
            }
            if (error.response && error.response.status === 401) {
                localStorage.clear()
                navigate('/login')
            }
        }
    }

    const registraAtendimento = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')

        try {
            const url = `${process.env.BACKEND_URL}/login/${id}/adiciona-servico`

            const response = await axios.post(url, {
                nome_funcionario: selectedFuncionario,
                clientName: clientName,
                selectedService: selectedService
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 201) {
                setSelectedFuncionario('')
                setClientName('')
                setSelectedService('')
                listaAtendimentos()
                showToast('Atendimento registrado!', 'success')
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Error: ', error.message)
                showToast('Erro na requisição!', 'error')
                navigate('/')
            }
            if (error.response && error.response.status === 401) {
                localStorage.clear()
                navigate('/login')
            }
        }
    }

    // Função para listar funcionários
    const listaFuncionario = async () => {
        try {
            const url = `${process.env.BACKEND_URL}/login/${id}/lista-funcionario`
            const token = localStorage.getItem('token')

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const funcionarios = response.data

            setFuncionarios(funcionarios)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Error: ', error.message)
                showToast('Erro na requisição!', 'error')
                navigate('/')
            }
            if (error.response && error.response.status === 401) {
                localStorage.clear()
                navigate('/login')
            }
        }
    }

    // Função para listar tipos de serviços
    const listaTipoServicos = async () => {
        try {
            const url = `${process.env.BACKEND_URL}/servicos/${id}`
            const token = localStorage.getItem('token')

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const servicos = response.data

            setServicos(servicos)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Error: ', error.message)
                showToast('Erro na requisição!', 'error')
                navigate('/')
            }
            if (error.response && error.response.status === 401) {
                localStorage.clear()
                navigate('/login')
            }
        }
    }

    useEffect(() => {
        listaAtendimentos()
        listaFuncionario()
        listaTipoServicos()
    }, [])

    return (
        <div className="container-atendimento">
            <form className="form-adiciona-atendimento">
                <h2>{`</Novo atendimento>`}</h2>
                <label>Cliente:</label>
                <input type="text" name="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)}/>
                <div className="form-select">
                    <label>Funcionário:</label>
                    <select name="selectedFuncionario" value={selectedFuncionario} onChange={(e) => setSelectedFuncionario(e.target.value)}>
                        <option value="" disabled hidden>Funcionários</option>
                        {Array.isArray(funcionarios) ? (
                            funcionarios.map(funcionario => (
                                <option key={funcionario.id_funcionario} value={funcionario.nome_funcionario}>
                                    {funcionario.nome_funcionario}
                                </option>
                            ))
                        ) : (
                            <option value="Nenhum funcionário">Nenhum funcionário</option>
                        )}
                    </select>

                    <label>Serviço:</label>
                    <select name="selectedService" value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                        <option value="" disabled hidden>Serviços</option>
                        {Array.isArray(servicos) ? (
                            servicos.map(servico => (
                                <option key={servico.id_tipo_servico} value={servico.descricao}>
                                    {servico.descricao}
                                </option>
                            ))
                        ) : (
                            <option value="Nenhum serviço">Nenhum serviço</option>
                        )}
                    </select>
                </div>
                <div className="buttons">
                    <button className="button-confirmar" onClick={(event) => registraAtendimento(event)}>Registrar Atendimento</button>
                </div>
            </form>
            <h2>Histórico de atendimentos:</h2>
            {atendimentos === undefined ? (
                <h2>Carregando...</h2>
            ) : atendimentos === 'Sem atendimentos registrados' ? (
                <h2>Sem atendimentos registrados hoje.</h2>
            ) : (
                atendimentos.map((atendimento, index) => (
                    <div key={index} className="card-atendimento">
                        <p><strong>Nome do cliente:</strong> {atendimento.clientName}</p>
                        <p><strong>Serviço selecionado:</strong> {atendimento.selectedService}</p>
                        <p><strong>Valor do serviço:</strong> {atendimento.valor}</p>
                        <p><strong>Nome do funcionário:</strong> {atendimento.nome_funcionario}</p>
                        <p><strong>Hora do atendimento:</strong> {atendimento.timestamp}</p>
                    </div>
                ))
            )}
        </div>
    )
}

export default Atendimento
