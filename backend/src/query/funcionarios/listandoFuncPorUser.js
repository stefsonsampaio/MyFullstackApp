const knex = require('../connection')

const listandoFuncPorUsu = async (id_usuario) => {
    const funcionarios = await knex('funcionario')
        .select('*')
        .where('id_usuario', id_usuario)
        .andWhere('data_demissao', null)
        .orderBy('data_admissao', 'desc')

    return funcionarios
}

module.exports = listandoFuncPorUsu