const knex = require('../connection')

const anulandoPreco = async (id_tipo_servico, timestamp, id_usuario) => {
    const servicoAnulado = await knex('historico_preco')
        .update({
            data_fim: timestamp
        })
        .where('id_tipo_servico', id_tipo_servico)
        .andWhere('id_usuario', id_usuario)
        .andWhere('data_fim', null)
        .returning('*')

    return servicoAnulado
}

module.exports = anulandoPreco