const knex = require('../connection')

const buscaAtendimentos = async (id_usuario) => {
    const response = await knex('servico as s')
        .select(
            's.nome_cliente as clientName', 
            'ts.descricao as selectedService',
            'f.nome_funcionario', 
            'h.valor as valor',
            knex.raw("to_char(s.data_hora, 'YYYY-MM-DD HH24:MI') as timestamp")
        )
        .leftJoin('tipo_servico as ts', 'ts.id_tipo_servico', 's.id_tipo_servico')
        .leftJoin('funcionario as f', 'f.id_funcionario', 's.id_funcionario')
        .leftJoin('historico_preco as h', 'h.id_valor', 's.id_valor')
        .where('s.id_usuario', id_usuario)
        .orderBy('s.data_hora', 'desc')
        
    return response
}

module.exports = buscaAtendimentos