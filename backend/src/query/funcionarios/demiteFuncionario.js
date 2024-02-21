const knex = require('../connection')

const demiteFuncionario = async (nome_funcionario, timestamp) => {
    const funcionario = await knex('funcionario')
        .update({
            data_demissao: knex.fn.now()
        })
        .where('nome_funcionario', nome_funcionario)
        .returning('*')
    
    return funcionario
}

module.exports = demiteFuncionario