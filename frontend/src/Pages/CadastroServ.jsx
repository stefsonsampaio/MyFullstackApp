import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import showToast from '../components/Toast'

function CadastroServ() {
    const navigate = useNavigate()
    const [nomeServico, setNomeServico] = useState('')
    const [valorServico, setValorServico] = useState('')
    const [servicos, setServicos] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [selectedServico, setSelectedServico] = useState(null)
    const modalRef = useRef(null)

    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setOpenModal(false);
        }
    }

    const listaServicos = async () => {
        try {
            const url = `http://localhost:1155/servicos/${id}`
            const token = localStorage.getItem('token')

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const jsonresponse = response.data

            setServicos(jsonresponse)
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

    const openModalWithData = (servico) => {
        setSelectedServico(servico);
        setOpenModal(true);
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    const updateServico = async () => {
        const url = `http://localhost:1155/servicos/${id}/altera-preco`

        try {
            const response = await axios.post( url, {
                    descricao: selectedServico.descricao,
                    valor: valorServico,
                    timestamp: new Date()
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (response.status === 201) {
                closeModal()
                listaServicos()
                showToast('Serviço atualizado com sucesso!', 'success')
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

    const deleteServico = async () => {
        const url = `http://localhost:1155/servicos/${id}/deleta-servico`
        try {
            const response = await axios.put(url, {
                    id_valor: selectedServico.id_valor
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 204) {
                closeModal()
                listaServicos()
                showToast('Serviço deletado com sucesso!', 'success')
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

        const url = `http://localhost:1155/servicos/${id}/cadastra-servico`
        const urlValor = `http://localhost:1155/servicos/${id}/adiciona-preco`

        try {
            await axios.post(url, {
                descricao: nomeServico
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const responseValor = await axios.post(urlValor, {
                descricao: nomeServico,
                valor: valorServico
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (responseValor.status === 201) {
                setNomeServico('')
                setValorServico('')
                listaServicos()
                showToast('Serviço criado com sucesso!', 'success')
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
        listaServicos()
        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [])

    return(
        <div className="container-cadastro-alternativo">
            <form className="form-cadastro-alternativo">
                <h1>{`</cadastro de serviço>`}</h1>
                <label>Serviço</label>
                <input type="text" name="nomeServico" value={nomeServico} onChange={(e) => setNomeServico(e.target.value)}/>
                <label>Preço do serviço</label>
                <input type="number" name="valorServico" value={valorServico} onChange={(e) => setValorServico(e.target.value)}/>
                <div className="buttons">
                    <button className="button-confirmar" onClick={(event) => fnConfirmar(event)}>Cadastro</button>
                    <button className="button-cancelar" onClick={(event) => fnCancelar(event)}>Cancelar</button>
                </div>
            </form>
            <h2>Lista de serviços:</h2>
            {Array.isArray(servicos) ? (
                servicos.map((servico, index) => (
                    <div key={index} className="card-alternativo" onClick={() => openModalWithData(servico)}>
                        <p><strong>Descrição do serviço:</strong> {servico.descricao}</p>
                        <p><strong>Valor:</strong> R$ {servico.valor}</p>
                    </div>
                ))
            ) : (
                <h2>Sem serviços registrados</h2>
            )}
            <Modal isOpen={openModal} setModalOpen={closeModal}>
                {selectedServico && (
                    <div ref={modalRef}>
                        <h2>{`</Atualizador de serviço>`}</h2>
                        <p>
                            <strong>Descrição do serviço:</strong> {selectedServico.descricao}
                            <strong>Valor:</strong> R$ {selectedServico.valor}
                        </p>
                        <input
                            type="number"
                            value={valorServico}
                            onChange={(e) => setValorServico(e.target.value)}
                            placeholder="Novo valor do serviço"
                        />
                        <div className="buttons">
                            <button className="button-confirmar" onClick={updateServico}>
                                Atualizar
                            </button>
                            <button className="button-cancelar" onClick={deleteServico}>
                                Deletar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default CadastroServ