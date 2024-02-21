const contaAtendPorMes = require('../../query/dashboard/contaAtendPorMes')

const ContAtendPorMes = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json('ID não informado')
    }

    try {
        const response = await contaAtendPorMes(id)

        if (!response[0]) {
            return res.status(200).json('Sem dados para apresentar')
        }

        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = ContAtendPorMes