const knex = require('../connection');

const verificaTempoValido = async (id_usuario, id_funcionario, id_tipo_servico, nome_cliente) => {
    const response = await knex('servico')
        .select('*')
        .where('nome_cliente', nome_cliente)
        .andWhere('id_tipo_servico', id_tipo_servico)
        .andWhere('id_usuario', id_usuario)
        .andWhere('id_funcionario', id_funcionario)
        .andWhereRaw("DATE_PART('minute', data_hora - current_timestamp) < 1")

    return response
}

module.exports = verificaTempoValido