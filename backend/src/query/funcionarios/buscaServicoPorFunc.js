const knex = require('../connection')

const buscaServicoPorFunc = async (id_funcionario) => {
    const servicos = await knex('servico')
        .select('*')
        .where('id_funcionario', id_funcionario)
    
    return servicos
}

module.exports = buscaServicoPorFunc