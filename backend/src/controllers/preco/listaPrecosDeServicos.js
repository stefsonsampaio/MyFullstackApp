const listandoPrecos = require('../../query/precos/listandoPrecos')

const listaPrecoDeServicos = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(200).json('Id do usuário não informado')
    }

    try {
        const response = await listandoPrecos(id)

        if (!response[0]) {
            return res.status(200).json('Ainda não tem registros de preços de serviços')
        }

        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = listaPrecoDeServicos