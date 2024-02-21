const knex = require('../connection')

const verificaUsuarioPorId = async (id) => {
    const usuarioEncontrado = await knex('usuario')
        .select('*')
        .where('id_usuario', id)

    return usuarioEncontrado
}

module.exports = verificaUsuarioPorId