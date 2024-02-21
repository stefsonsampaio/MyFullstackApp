const express = require('express')
const cadastrarUsuario = require('../controllers/usuario/cadastrarUsuario')
const logarUsuario = require('../controllers/usuario/logarUsuario')
const registrarAtendimento = require('../controllers/atendimento/registrarAtendimento')
const auth = require('../middleware/auth')
const listaAtendimentos = require('../controllers/atendimento/listaAtendimentos')
const cadastrarFuncionario = require('../controllers/funcionario/cadastrarFuncionario')
const demitirFuncionario = require('../controllers/funcionario/demitirFuncionario')
const listarFuncionario = require('../controllers/funcionario/listarFuncionario')
const cadastrarServico = require('../controllers/servicos/cadastrarServico')
const listaServico = require('../controllers/servicos/listaServico')
const adicionaPrecoDeServico = require('../controllers/preco/adicionaPrecoDeServico')
const listaPrecoDeServicos = require('../controllers/preco/listaPrecosdeServicos')
const alteraPrecoDeServico = require('../controllers/preco/alteraPrecoDeServico')
const listaAtendPorFunc = require('../controllers/dashboards/listaAtendPorFunc')
const ContAtendPorTipo = require('../controllers/dashboards/ContAtendPorTipo')
const ContAtendPorMes = require('../controllers/dashboards/ContAtendPorMes')
const deletarServico = require('../controllers/servicos/deletarServico')
const router = express.Router()

router.get('/', (req, res) =>{
    return res.send({ res: 'ok' })
})

//rotas de cadastro e login
router.post('/cadastro', cadastrarUsuario)
router.post('/login', logarUsuario)

router.use(auth)

//rotas dos atendimentos
router.post('/login/:id/adiciona-servico', registrarAtendimento)
router.get('/login/:id/lista-servico', listaAtendimentos)

//rotas dos funcionários
router.post('/login/:id/cadastra-funcionario', cadastrarFuncionario)
router.put('/login/:id/demite-funcionario', demitirFuncionario)
router.get('/login/:id/lista-funcionario', listarFuncionario)

//rotas dos serviços
router.get('/servicos/:id', listaServico)
router.post('/servicos/:id/cadastra-servico', cadastrarServico)
router.put('/servicos/:id/deleta-servico', deletarServico)

//rotas dos preços
router.post('/servicos/:id/adiciona-preco', adicionaPrecoDeServico)
router.post('/servicos/:id/altera-preco', alteraPrecoDeServico)
router.get('/servicos/:id/lista-preco', listaPrecoDeServicos)

//rotas dashboard
router.get('/dashboard/:id/atendimento-funcionario', listaAtendPorFunc)
router.get('/dashboard/:id/atendimento-por-tipo', ContAtendPorTipo)
router.get('/dashboard/:id/atendimento-por-mes', ContAtendPorMes)

module.exports = router
