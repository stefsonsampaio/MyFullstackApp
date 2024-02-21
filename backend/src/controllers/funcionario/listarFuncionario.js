const listandoFuncPorUser = require('../../query/funcionarios/listandoFuncPorUser')

const listarFuncionario = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json('Id não informado')
    }

    try {
        const funcionarios = await listandoFuncPorUser(id)

        if (!funcionarios[0]) {
            return res.status(200).json('Sem funcionários registrados para esse usuário')
        }

        return res.status(200).json(funcionarios)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = listarFuncionario