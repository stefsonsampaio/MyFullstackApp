const knex = require('../connection')

const verificaFuncPorNome = async (nome_funcionario) => {
    const funcionario = await knex('funcionario')
        .select('*')
        .where('nome_funcionario', nome_funcionario)

    return funcionario[0]
}

module.exports = verificaFuncPorNome