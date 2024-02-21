const verificaServicoPorDesc = require('../../query/servico/verificaServicoPorDesc')
const cadastraServico = require('../../query/servico/cadastraServico')

const cadastrarServico = async (req, res) => {
    const { descricao } = req.body
    const { id } = req.params

    if (!descricao || !id) {
        return res.status(400).json('Preencha todos os campos')
    }

    try {
        const servicoExistente = await verificaServicoPorDesc(id, descricao)

        if (servicoExistente) {
            return res.status(400).json('Já tem um serviço com essa descrição')
        }

        const servico = await cadastraServico(id, descricao)

        return res.status(201).json(servico)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = cadastrarServico