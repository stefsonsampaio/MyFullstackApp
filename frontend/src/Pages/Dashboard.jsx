import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Bar, Pie, Line } from 'react-chartjs-2'
import { useParams, useNavigate } from 'react-router-dom'

function Dashboard() {
    const { id } = useParams()
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [activeDashboard, setActiveDashboard] = useState('tipo')
    const navigate = useNavigate()

    if (id === null) {
        localStorage.clear()
        navigate('/')
    }

    useEffect(() => {
        fetchData()
        fetchData2()
        fetchData3()
    }, [])

    const fetchData = async () => {
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/dashboard/${id}/atendimento-por-tipo`
            const token = localStorage.getItem('token')

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(response.data)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Error: ', error.message)
                navigate('/')
            }
            if (error.response && error.response.status === 401) {
                localStorage.clear()
                navigate('/login')
            }
        }
    }
    
        const renderChart = () => {
            const serviceCounts = {}
            data.forEach(item => {
                if (!serviceCounts[item.descricao]) {
                    serviceCounts[item.descricao] = 0
                }
                serviceCounts[item.descricao] += parseInt(item.quantidade)
            })
    
            const chartData = {
                labels: Object.keys(serviceCounts),
                datasets: [
                    {
                        label: 'Quantidade de Serviços',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                        hoverBorderColor: 'rgba(75,192,192,1)',
                        data: Object.values(serviceCounts)
                    }
                ]
            }
    
            return (
                <Bar
                    data={chartData}
                    width={100}
                    height={50}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                ticks: {
                                    stepSize: 1,
                                    beginAtZero: true
                                }
                            }
                        }
                    }}
                />
            )
        }

    const fetchData2 = async () => {
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/dashboard/${id}/atendimento-funcionario`
            const token = localStorage.getItem('token')

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data2 = response.data
            setData2(data2)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Error: ', error.message)
                navigate('/')
            }
            if (error.response && error.response.status === 401) {
                localStorage.clear()
                navigate('/login')
            }
        }
    }

    const renderChart2 = () => {
        const labels = data2.map(item => item.nome_funcionario)
        const quantities = data2.map(item => parseInt(item.quantidade))

        const chartData2 = {
            labels: labels,
            datasets: [
                {
                    data: quantities,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                    ]
                }
            ]
        }

        return <Pie data={chartData2} />
    }

    const fetchData3 = async () => {
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/dashboard/${id}/atendimento-por-mes`
            const token = localStorage.getItem('token')

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data3 = response.data
            setData3(data3)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Error: ', error.message)
                navigate('/')
            }
            if (error.response && error.response.status === 401) {
                localStorage.clear()
                navigate('/login')
            }
        }
    }

    const renderChart3 = () => {
        const labels = []
        const quantities = []
    
        const today = new Date()
        let year = today.getFullYear()
        let month = today.getMonth() + 1
    
        for (let i = 0; i < 6; i++) {
            if (month === 0) {
                month = 12
                year--
            }
    
            const formattedMonth = month.toString().padStart(2, '0')
            const formattedYear = year.toString()
            const formattedDate = `${formattedMonth}/${formattedYear}`
    
            labels.unshift(formattedDate)
    
            const dataForMonth = data3.find(item => item.mes === formattedDate)
            if (dataForMonth) {
                quantities.unshift(parseInt(dataForMonth.quantidade_atendimentos))
            } else {
                quantities.unshift(0)
            }
    
            month--
        }
    
        const chartData3 = {
            labels: labels,
            datasets: [
                {
                    label: 'Quantidade de Atendimentos por Mês',
                    data: quantities,
                    fill: false,
                    borderColor: 'rgba(75,192,192,1)',
                    tension: 0.1
                }
            ]
        }
    
        return <Line data={chartData3} options={{
            scales: {
                y: {
                    ticks: {
                        stepSize: 1, 
                        beginAtZero: true, 
                        precision: 0 
                    }
                }
            }
        }} />
    }
    

    return (
        <div className="container-dashboard">
            <h1>Meu Dashboard</h1>
            <div className="dashboard-buttons">
                <button onClick={() => setActiveDashboard('tipo')}>Dashboard por Tipo</button>
                <button onClick={() => setActiveDashboard('funcionario')}>Dashboard por Funcionário</button>
                <button onClick={() => setActiveDashboard('tempo')}>Dashboard por Mês</button>
            </div>
            <div className="container-chart">
                {activeDashboard === 'tipo' && (
                    <div className="chart-container">
                        <div className="chart-scroll">{renderChart()}</div>
                    </div>
                )}
                {activeDashboard === 'funcionario' && (
                    <div className="chart-container">
                        <div className="chart-scroll2">{renderChart2()}</div>
                    </div>
                )}
                {activeDashboard === 'tempo' && (
                    <div className="chart-container">
                        <div className="chart-scroll3">{renderChart3()}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard

