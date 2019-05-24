var express = require('express');
var router = express.Router();
var Futebol = require('../controllers/futebol');


// -------------------- Competicoes ----------------------

router.get('/competicoes', async function(req, res, next) {
    var dados = await Futebol.listarCompeticoes();
    res.jsonp(dados);
});

router.get('/competicoes/:id/equipas', async function(req, res, next) {
    var dados = await Futebol.listarEquipasPorCompeticao(req.params.id);
    res.jsonp(dados);
});

router.get('/competicoes/:id/classificacoes', async function(req, res, next) {
    var dados = await Futebol.listarClassificacoesPorCompeticao(req.params.id);
    res.jsonp(dados);
});

router.get('/competicoes/:id/jogos', async function(req, res, next) {
    var dados = await Futebol.listarJogosPorCompeticao(req.params.id);
    res.jsonp(dados);
});

// -------------------- Jogos ----------------------

router.get('/jogos/:id', async function(req, res, next) {
    var dados = await Futebol.infoJogo(req.params.id);
    res.jsonp(dados);
});

router.get('/jogos/:id/arbitros', async function(req, res, next) {
    var dados = await Futebol.jogoArbitros(req.params.id);
    res.jsonp(dados);
});


// -------------------- Equipas ----------------------

router.get('/equipas/:id', async function(req, res, next) {
    var dados = await Futebol.infoEquipa(req.params.id);
    res.jsonp(dados);
});

router.get('/equipas/:id/jogadores', async function(req, res, next) {
    var dados = await Futebol.equipaJogadores(req.params.id);
    res.jsonp(dados);
});

router.get('/equipas/:id/jogos', async function(req, res, next) {
    var dados = await Futebol.equipaJogos(req.params.id);
    res.jsonp(dados);
});

// -------------------- Jogadores ----------------------

router.get('/jogadores/:id', async function(req, res, next) {
    var dados = await Futebol.infoJogador(req.params.id);
    res.jsonp(dados);
});

// -------------------- Treinadores ----------------------

router.get('/treinadores/:id', async function(req, res, next) {
    var dados = await Futebol.infoTreinador(req.params.id);
    res.jsonp(dados);
});

// -------------------- Arbitros ----------------------
router.get('/arbitros', async function(req, res, next) {
    var dados = await Futebol.listarArbitros();
    res.jsonp(dados);
});


router.get('/arbitros/:id', async function(req, res, next) {
    var dados = await Futebol.infoArbitro(req.params.id);
    res.jsonp(dados);
});

// -------------------- Counts ----------------------

router.get('/counts/competicoes', async function(req, res, next) {
    var dados = await Futebol.countCompeticoes();
    res.jsonp(dados);
});

router.get('/counts/equipas', async function(req, res, next) {
    var dados = await Futebol.countEquipas();
    res.jsonp(dados);
});

router.get('/counts/jogos', async function(req, res, next) {
    var dados = await Futebol.countJogos();
    res.jsonp(dados);
});

router.get('/counts/jogadores', async function(req, res, next) {
    var dados = await Futebol.countJogadores();
    res.jsonp(dados);
});

router.get('/counts/treinadores', async function(req, res, next) {
    var dados = await Futebol.countTreinadores();
    res.jsonp(dados);
});

router.get('/counts/arbitros', async function(req, res, next) {
    var dados = await Futebol.countArbitros();
    res.jsonp(dados);
});

module.exports = router;