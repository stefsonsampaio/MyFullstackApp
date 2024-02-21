const listarServicos = require('../../query/servico/listarServicos')

const listaServico = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json('Id não informado no parâmetro')
    }

    try {
        const servicos = await listarServicos(id)

        if (!servicos[0]) {
            return res.status(200).json('Nenhum serviço encontrado para esse id')
        }

        return res.status(200).json(servicos)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = listaServico