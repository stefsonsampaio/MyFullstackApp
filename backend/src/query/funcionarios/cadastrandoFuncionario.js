const knex = require('../connection')

const cadastrandoFuncionario = async (id_usuario, nome_funcionario, timestamp) => {
    const funcionario = await knex('funcionario')
        .insert({
            id_usuario,
            nome_funcionario,
            data_admissao: timestamp
        })
        .returning('*')

    return funcionario
}

module.exports = cadastrandoFuncionario