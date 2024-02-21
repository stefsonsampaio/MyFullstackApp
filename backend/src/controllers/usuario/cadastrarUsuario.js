const Encriptador = require('../../utils/Encriptador')
const verificaUsuarioPorName = require('../../query/usuarios/verificaUsuarioPorNome')
const cadastrandoUsuario = require('../../query/usuarios/cadastrandoUsuario')


const cadastrarUsuario = async (req, res) => {
    const { username, password } = req.body

    if (!username, !password) {
        return res.status(400).json('Preencha as informações necessárias')
    }

    try {
        const usuarioExistente = await verificaUsuarioPorName(username)

        if (usuarioExistente.length > 0) {
            return res.status(404).json('Username já está em uso')
        }

        const senhaCriptografada = await Encriptador(password)

        const usuario = { username, senhaCriptografada}
        const novoUsuario = await cadastrandoUsuario(usuario)

        delete novoUsuario[0].senha

        return res.status(201).json(novoUsuario[0])
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = cadastrarUsuario