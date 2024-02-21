const knex = require('../connection')

const adicionaServico = async (id_usuario, id_funcionario, id_tipo_servico, id_valor, nome_cliente) => {
    const novoServico = await knex('servico')
        .insert({
            id_usuario,
            id_tipo_servico,
            id_valor,
            nome_cliente,
            id_funcionario
        })
        .returning('*')

    return novoServico[0]
}

module.exports = adicionaServico