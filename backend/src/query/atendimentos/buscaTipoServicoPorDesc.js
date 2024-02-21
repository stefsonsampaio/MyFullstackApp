const knex = require('../connection')

const buscaTipoServicoPorDesc = async (descServico) => {
    const idServico = await knex('tipo_servico')
        .select('id_tipo_servico')
        .where('descricao', descServico)
    
    return idServico[0]
}

module.exports = buscaTipoServicoPorDesc