const knex = require('../connection')

const contaAtendPorTipo = async (id_usuario) => {
    const quantidades = await knex.select('t.descricao', 's.id_tipo_servico')
        .count('s.id_servico as quantidade')
        .from('servico as s')
        .innerJoin('tipo_servico as t', 't.id_tipo_servico', 's.id_tipo_servico')
        .where('s.id_usuario', id_usuario)
        .groupBy('t.descricao', 's.id_tipo_servico')

    return quantidades
}

module.exports = contaAtendPorTipo