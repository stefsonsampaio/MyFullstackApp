const buscandoUsuarios = require('../../query/admin/buscandoUsuarios')

const buscarUsuarios = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json('Id não informado')
    }

    try {
        const usuarios = await buscandoUsuarios()

        if (usuarios[0].length < 1) {
            return res.status(200).json('Sem usuários cadastrados')
        }

        return res.status(200).json(usuarios)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = buscarUsuarios