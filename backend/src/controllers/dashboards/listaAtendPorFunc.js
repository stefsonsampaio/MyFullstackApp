const buscaAtendPorFunc = require('../../query/dashboard/buscaAtendPorFunc')

const listaAtendPorFunc = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json('Informe o id do usuário')
    }

    try {
        const response = await buscaAtendPorFunc(id)

        if (!response[0]) {
            return res.status(200).json('Nenhum serviço registrado')
        }

        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = listaAtendPorFunc