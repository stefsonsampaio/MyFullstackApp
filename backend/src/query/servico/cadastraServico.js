const knex = require('../connection')

const cadastraServico = async (id_usuario, descricao) => {
    const servico = await knex('tipo_servico')
        .insert({
            id_usuario,
            descricao
        })
        .returning('*')

    return servico
}

module.exports = cadastraServico