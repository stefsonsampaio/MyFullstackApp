const knex = require('../connection')

const listandoPrecos = async (id_usuario) => {
    const response = await knex('historico_preco as h')
        .select('t.descricao', 'h.valor', 'h.data_inicio', 'h.data_fim')
        .innerJoin('tipo_servico as t', 't.id_tipo_servico', 'h.id_tipo_servico')
        .where('h.id_usuario', id_usuario)

    return response
}

module.exports = listandoPrecos