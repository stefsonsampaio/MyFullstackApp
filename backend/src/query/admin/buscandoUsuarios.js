const knex = require('../connection')

const buscandoUsuarios = async () => {
    const usuarios = knex('usuario').
    select('id_usuario', 'usuario', 'usuario_liberado')

    return usuarios
}

module.exports = buscandoUsuarios