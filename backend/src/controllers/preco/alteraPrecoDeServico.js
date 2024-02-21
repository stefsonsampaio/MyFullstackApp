const verificaServicoPorDesc = require("../../query/servico/verificaServicoPorDesc")
const anulandoPreco = require('../../query/precos/anulandoPreco')
const adicionandoPrecoServ = require('../../query/precos/adicionandoPrecoServ')

const alteraPrecoDeServico = async (req, res) => {
    const { descricao, valor, timestamp } = req.body
    const { id } = req.params

    if (!descricao || !valor || !timestamp || !id) {
        return res.status(400).json('Preencha todos os campos obrigatórios')
    }

    try {
        const idServico = await verificaServicoPorDesc(id, descricao)

        if (!idServico) {
            return res.status(400).json('Não foi encontrado serviço com essa descrição')
        }

        const precoAnulado = await anulandoPreco(idServico.id_tipo_servico, timestamp, id)
        
        if (!precoAnulado[0]) {
            return res.status(400).json('Não foi possível anular o preço')
        }

        const novoServico = await adicionandoPrecoServ(idServico.id_tipo_servico, valor, id)

        return res.status(201).json(novoServico)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = alteraPrecoDeServico