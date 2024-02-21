const knex = require('../connection');

const contaAtendPorMes = async (id_usuario) => {
    const response = await knex.select(
            knex.raw("TO_CHAR(DATE_TRUNC('month', data_hora), 'MM/YYYY') AS mes"),
            knex.raw("COUNT(*) AS quantidade_atendimentos")
        )
        .from('servico')
        .where('id_usuario', id_usuario)
        .groupByRaw("TO_CHAR(DATE_TRUNC('month', data_hora), 'MM/YYYY')")
        .orderByRaw('mes')

    return response
}

module.exports = contaAtendPorMes
