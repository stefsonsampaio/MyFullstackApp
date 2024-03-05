import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import InputMask from 'react-input-mask'
import Modal from '../components/Modal'
import showToast from '../components/Toast'

function CadastroFunc() {
    const navigate = useNavigate()
    const [nomeFuncionario, setNomeFuncionario] = useState('')
    const [timestamp, setTimestamp] = useState('')
    const [funcionarios, setFuncionarios] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [selectedFunc, setSelectedFunc] = useState(null)
    const modalRef = useRef(null)

    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setOpenModal(false)
        }
    }

    const listaFuncionarios = async () => {
        try {
            const url = `${process.env.BACKEND_URL}/login/${id}/lista-funcionario`
            const token = localStorage.getItem('token')

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const jsonresponse = response.data

            setFuncionarios(jsonresponse)
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

    const openModalWithData = (funcionario) => {
        setSelectedFunc(funcionario)
        setOpenModal(true)
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    const demiteFuncionario = async () => {
        const url = `${process.env.BACKEND_URL}/login/${id}/demite-funcionario`
        try {
            const response = await axios.put(url, {
                    nome_funcionario: selectedFunc.nome_funcionario,
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 204) {
                closeModal()
                listaFuncionarios()
                showToast('Funcionário deletado com sucesso!', 'success')
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

    const fnConfirmar = async (event) => {
        event.preventDefault()

        const url = `${process.env.BACKEND_URL}/login/${id}/cadastra-funcionario`

        try {
            const response = await axios.post(url, {
                nome_funcionario: nomeFuncionario,
                timestamp: `${timestamp} 00:00:00`
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 201) {
                setNomeFuncionario('')
                setTimestamp('')
                listaFuncionarios()
                showToast('Funcionário cadastrado com sucesso!', 'success')
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

    const fnCancelar = async (event) => {
        event.preventDefault()
        navigate('/')
    }

    useEffect(() => {
        listaFuncionarios()
        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [])

    return (
        <div className="container-cadastro-alternativo">
            <form className="form-cadastro-alternativo">
                <h1>{`</cadastro de funcionário>`}</h1>
                <label>Nome do funcionário</label>
                <input type="text" name="nomeFuncionario" value={nomeFuncionario} onChange={(e) => setNomeFuncionario(e.target.value)}/>
                <label>Data da contratação</label>
                <InputMask mask="9999-99-99" value={timestamp} onChange={(e) => setTimestamp(e.target.value)}>
                    {(inputProps) => <input {...inputProps} type="text" />}
                </InputMask>
                <div className="buttons">
                    <button className="button-confirmar" onClick={(event) => fnConfirmar(event)}>Cadastrar</button>
                    <button className="button-cancelar" onClick={(event) => fnCancelar(event)}>Cancelar</button>
                </div>
            </form>
            <h2>Lista de funcionários:</h2>
            {Array.isArray(funcionarios) ? (
                funcionarios.map((funcionario, index) => (
                    <div key={index} className="card-alternativo" onClick={() => openModalWithData(funcionario)}>
                        <p><strong>Funcionário:</strong> {funcionario.nome_funcionario}</p>
                        <p><strong>Data de admissão:</strong> {funcionario.data_admissao.substring(0,10)}</p>
                    </div>
                ))
            ) : (
                <h2>Sem funcionários registrados</h2>
            )}
            <Modal isOpen={openModal} setModalOpen={closeModal}>
                {selectedFunc && (
                    <div ref={modalRef}>
                        <h2>{`</Atualizador de funcionário>`}</h2>
                        <p>
                            <strong>Nome do funcionário:</strong> {selectedFunc.nome_funcionario}
                            <strong>Datta de admissão:</strong> {selectedFunc.data_admissao.substring(0,10)}
                        </p>
                        <div className="buttons">
                            <button className="button-cancelar" onClick={demiteFuncionario}>
                                Deletar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default CadastroFunc