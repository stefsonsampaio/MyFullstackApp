const knex = require('../connection')

const verificaFuncDemitido = async (id_funcionario) => {
    const validacao = await knex('funcionario')
        .select('*')
        .where('id_funcionario', id_funcionario)
        .andWhere('data_demissao', null)

    return validacao[0]
}

module.exports = verificaFuncDemitido