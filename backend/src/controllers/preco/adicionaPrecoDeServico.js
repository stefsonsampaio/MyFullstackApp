const buscaTipoServicoPorDesc = require("../../query/atendimentos/buscaTipoServicoPorDesc")
const adicionandoPrecoServ = require('../../query/precos/adicionandoPrecoServ')
const verificandoPrecoExistente = require('../../query/precos/varificandoPrecoExistente')

const adicionaPrecoDeServico = async (req, res) => {
    const { descricao, valor } = req.body
    const { id } = req.params

    if (!descricao || !valor || !id ) {
        return res.status(400).json('Preencha todos os campos necessários')
    }

    try {
        const idServico = await buscaTipoServicoPorDesc(descricao)

        if (!idServico.id_tipo_servico) {
            return res.status(400).json('Não foi encontrado o serviço indicado')
        }

        const precoJaExistente = await verificandoPrecoExistente(idServico.id_tipo_servico, id)

        if (precoJaExistente) {
            return res.status(400).json('O preço que está tentando cadastrar já existe no banco.')
        }

        const precoDeServico = await adicionandoPrecoServ(idServico.id_tipo_servico, valor, id)

        return res.status(201).json(precoDeServico)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = adicionaPrecoDeServico