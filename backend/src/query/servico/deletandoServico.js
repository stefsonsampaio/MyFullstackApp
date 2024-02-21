const knex = require('../connection')

const deletandoServico = async (id_valor) => {
    const deletado = await knex('historico_preco')
        .update('data_fim', knex.raw('now()'))
        .where('id_valor', id_valor)
        .andWhere('data_fim', null)
        .returning('*')

    return deletado[0]
}

module.exports = deletandoServico