const knex = require('../connection')

const verificaServicoPorDesc = async (id_usuario, descricao) => {
    const servico = await knex('tipo_servico as t')
        .select('*')
        .innerJoin('historico_preco as h', 'h.id_tipo_servico', 't.id_tipo_servico')
        .where('t.id_usuario', id_usuario)
        .andWhere('t.descricao', descricao)
        .andWhere('h.data_fim', null)

    return servico[0]
}

module.exports = verificaServicoPorDesc