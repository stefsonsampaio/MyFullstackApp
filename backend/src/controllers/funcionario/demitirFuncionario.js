const verificaFuncPorNome = require("../../query/funcionarios/verificaFuncPorNome")
const demiteFuncionario = require('../../query/funcionarios/demiteFuncionario')

const demitirFuncionario = async (req, res) => {
    const { nome_funcionario } = req.body

    if (!nome_funcionario) {
        return res.status(400).json('Preencha todos os campos')
    }

    try {
        const funcionarioExistente = await verificaFuncPorNome(nome_funcionario)

        if (!funcionarioExistente) {
            return res.status(400).json('Não foi encontrado funcionário com esse nome')
        }

        const funcionario = await demiteFuncionario(nome_funcionario)

        if (!funcionario) {
            return res.status(400).json('Nada foi deletado')
        }

        return res.status(204).json('Funcionário deletado com sucesso')
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = demitirFuncionario