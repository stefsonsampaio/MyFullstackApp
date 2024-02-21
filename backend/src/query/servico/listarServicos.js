const knex = require('../connection')

const listarServicos = async (id_usuario) => {
    const servicos = await knex('tipo_servico as t')
        .select('*')
        .innerJoin('historico_preco as h', 'h.id_tipo_servico', 't.id_tipo_servico')
        .where('h.id_usuario', id_usuario)
        .andWhere('h.data_fim', null)
        .orderBy('h.valor')

    return servicos
}

module.exports = listarServicos