const knex = require('../connection')

const buscaAtendPorFunc = async (id_usuario) => {
    const response = await knex('servico as s')
        .select('f.nome_funcionario')
        .count('s.id_servico as quantidade')
        .innerJoin('funcionario as f', 'f.id_funcionario', 's.id_funcionario')
        .where('s.id_usuario', id_usuario)
        .groupBy('f.nome_funcionario')

    return response
}

module.exports = buscaAtendPorFunc