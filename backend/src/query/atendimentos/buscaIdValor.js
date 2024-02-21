const knex = require('../connection')

const buscaIdValor = async (id_tipo_servico) => {
    const id_valor = await knex('historico_preco')
        .select('id_valor')
        .where('id_tipo_servico', id_tipo_servico)
        .whereNull('data_fim')

    return id_valor
}

module.exports = buscaIdValor