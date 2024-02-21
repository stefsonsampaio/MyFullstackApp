const verificaFuncPorNome = require('../../query/funcionarios/verificaFuncPorNome')
const cadastrandoFuncionario = require('../../query/funcionarios/cadastrandoFuncionario')

const cadastrarFuncionario = async (req, res) => {
    const { nome_funcionario, timestamp} = req.body
    const { id } = req.params

    if (!id || !nome_funcionario || !timestamp) {
        return res.status(400).json('Preencha todos os campos.')
    }

    try {
        const funcionarioExistente = await verificaFuncPorNome(nome_funcionario)

        if (funcionarioExistente) {
            return res.status(400).json('Já existe um funcionário com esse nome')
        }

        const funcionario = await cadastrandoFuncionario(id, nome_funcionario, timestamp)

        return res.status(201).json(funcionario)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = cadastrarFuncionario