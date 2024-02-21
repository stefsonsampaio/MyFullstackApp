const knex = require('../connection')

const buscaValorPorTipoServico = async (idTipoServico) => {
    const valor = await knex('historico_preco')
        .select('valor')
        .where('id_tipo_servico', idTipoServico)

    return valor
}

module.exports = buscaValorPorTipoServico