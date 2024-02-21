const buscaAtendimentos = require('../../query/atendimentos/buscaAtendimentos')

const listaAtendimentos = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json('Informe o id na requisição')
    }

    try {
        const response = await buscaAtendimentos(id)

        if (!response[0]) {
            return res.status(200).json('Sem atendimentos registrados')
        }

        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = listaAtendimentos
