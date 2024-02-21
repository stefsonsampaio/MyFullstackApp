const knex = require('../connection')

const verificandoPrecoExistente = async (id_tipo_servico, id_usuario) => {
    const precoExistente = await knex('historico_preco')
        .select('*')
        .where('id_usuario', id_usuario)
        .andWhere('id_tipo_servico', id_tipo_servico)
        .andWhere('data_fim', null)

    return precoExistente[0]
}

module.exports = verificandoPrecoExistente