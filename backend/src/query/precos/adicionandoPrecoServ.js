const knex = require('../connection')

const adicionandoPrecoServ = async (id_tipo_servico, valor, id_usuario) => {
    const novoPreco = await knex('historico_preco')
        .insert({
            id_tipo_servico,
            valor,
            id_usuario
        })
        .returning('*')

    return novoPreco
}

module.exports = adicionandoPrecoServ