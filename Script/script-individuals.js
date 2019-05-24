var request = require('request-promise')
var sleep = require('sleep');


var equipas = []
var jogos = []
var arbitros = []
var classificacoes = []
var jogadores = []
var competicoes = []
var treinadores = []


request.get({
    url: 'http://api.football-data.org/v2/competitions',
    headers: {
        'X-Auth-Token': '6f0a8db07e444773a5241eaad52f3e3e',
        'Content-Type': 'application/json'
    }
}).then(async dados1 => {
    var obj1 = JSON.parse(dados1)
    competicoes = obj1.competitions
    var competicao = ""
    await sleep.sleep(6)
    console.log("\n### Competições ###\n")
    for (var i = 0; i < competicoes.length; i++) {
        competicao = ""
        if ((competicoes[i].id == 2002) || (competicoes[i].id == 2014) || (competicoes[i].id == 2015) || (competicoes[i].id == 2017) || (competicoes[i].id == 2019) || (competicoes[i].id == 2021)) {
            competicao += ":c_" + competicoes[i].id + " a owl:NamedIndividual ,\n"
            competicao += "\t\t :Competicao ;\n"
            competicao += "\t:area \"" + competicoes[i].area.name + "\";\n"
            var name = competicoes[i].name
            await request.get({
                url: 'http://api.football-data.org/v2/competitions/' + competicoes[i].id + '/teams',
                headers: {
                    'X-Auth-Token': '6f0a8db07e444773a5241eaad52f3e3e',
                    'Content-Type': 'application/json'
                }
            }).then(async dados2 => {
                await sleep.sleep(6)
                var obj2 = JSON.parse(dados2)
                var teams = obj2.teams
                for (var t = 0; t < teams.length; t++) {
                    var equipa = {
                        id: teams[t].id,
                        anoFundacao: teams[t].founded,
                        area: teams[t].area.name,
                        coresClube: teams[t].clubColors,
                        email: teams[t].email,
                        estadio: teams[t].venue,
                        morada: teams[t].address,
                        nome: teams[t].name,
                        nomeCurto: teams[t].shortName,
                        tla: teams[t].tla,
                        website: teams[t].website
                    }
                    if (equipas.indexOf(equipa) == -1) {
                        equipas.push(equipa)
                    }
                    competicao += "\t:eCompostaPor :e_" + teams[t].id + ";\n"
                }
            }).catch(e2 => console.log('Erro2: ' + e2))
            await request.get({
                url: 'http://api.football-data.org/v2/competitions/' + competicoes[i].id + '/matches',
                headers: {
                    'X-Auth-Token': '6f0a8db07e444773a5241eaad52f3e3e',
                    'Content-Type': 'application/json'
                }
            }).then(async dados3 => {
                await sleep.sleep(6)
                var obj3 = JSON.parse(dados3)
                var matches = obj3.matches
                for (var m = 0; m < matches.length; m++) {
                    var match = {
                        id: matches[m].id,
                        jogaEmCasa: matches[m].homeTeam.id,
                        jogaFora: matches[m].awayTeam.id,
                        data: matches[m].utcDate,
                        golosCasa: matches[m].score.fullTime.homeTeam,
                        golosFora: matches[m].score.fullTime.awayTeam,
                        numeroDeJogo: matches[m].matchday,
                        arbitros: matches[m].referees,
                        vencedor: matches[m].score.winner
                    }
                    for (var a = 0; a < matches[m].referees.length; a++) {
                        var referee = {
                            id: matches[m].referees[a].id,
                            nome: matches[m].referees[a].name
                        }
                        if (arbitros.indexOf(referee) == -1) {
                            arbitros.push(referee)
                        }
                    }
                    if (jogos.indexOf(match) == -1) {
                        jogos.push(match)
                    }
                    competicao += "\t:eConstituida :j_" + matches[m].id + ";\n"
                }
                competicao += "\t:nome \"" + name + "\".\n"
            }).catch(e3 => console.log('Erro3: ' + e3))
            console.log(competicao)
            await request.get({
                url: 'http://api.football-data.org/v2/competitions/' + competicoes[i].id + '/standings',
                headers: {
                    'X-Auth-Token': '6f0a8db07e444773a5241eaad52f3e3e',
                    'Content-Type': 'application/json'
                }
            }).then(async dados4 => {
                await sleep.sleep(6)
                var obj4 = JSON.parse(dados4)
                var standings = obj4.standings[0].table
                for (var s = 0; s < standings.length; s++) {
                    var id = standings[s].team.id
                    var standing = {
                        id: id,
                        pertence: obj4.competition.id,
                        equipa: standings[s].team.id,
                        pontos: standings[s].points,
                        posicaoTabela: standings[s].position,
                        nJogos: standings[s].playedGames,
                        nVitorias: standings[s].won,
                        nEmpates: standings[s].draw,
                        nDerrotas: standings[s].lost,
                        diferencaDeGolos: standings[s].goalDifference,
                        nGolosMarcados: standings[s].goalsFor,
                        nGolosSofridos: standings[s].goalsAgainst
                    }
                    if (classificacoes.indexOf(standing) == -1) {
                        classificacoes.push(standing)
                    }
                }
            }).catch(e4 => console.log('Erro4: ' + e4))

        }

    }
    for (var e = 0; e < equipas.length; e++) {
        await request.get({
            url: 'http://api.football-data.org/v2/teams/' + equipas[e].id,
            headers: {
                'X-Auth-Token': '6f0a8db07e444773a5241eaad52f3e3e',
                'Content-Type': 'application/json'
            }
        }).then(async dados5 => {
            await sleep.sleep(6)
            var obj5 = JSON.parse(dados5)
            var players = obj5.squad
            for (var p = 0; p < players.length; p++) {
                if (players[p].role == 'PLAYER') {
                    var eq = []
                    eq.push(equipas[e].id)
                    var player = {
                        id: players[p].id,
                        jogaNaEquipa: eq,
                        dataNascimento: players[p].dateOfBirth,
                        nacionalidade: players[p].nationality,
                        paisNascimento: players[p].countryOfBirth,
                        nome: players[p].name,
                        posicao: players[p].position
                    }
                    if (jogadores.indexOf(player) == -1) {
                        jogadores.push(player)
                    }
                    else {
                        jogadores[player].jogaNaEquipa.push(equipas[e].id)
                    }
                }
                else {
                    if (players[p].role == 'COACH') {
                        var coach = {
                            id: players[p].id,
                            treina: equipas[e].id,
                            dataNascimento: players[p].dateOfBirth,
                            nacionalidade: players[p].nationality,
                            paisNascimento: players[p].countryOfBirth,
                            nome: players[p].name
                        }
                        if (treinadores.indexOf(coach) == -1) {
                            treinadores.push(coach)
                        }
                    }
                }
            }
        }).catch(e5 => console.log('Erro5: ' + e5))

    }
    console.log("\n### Equipas ###\n")
    for (var e = 0; e < equipas.length; e++) {
        var equipa = ""
        equipa += ":e_" + equipas[e].id + " a owl:NamedIndividual,\n"
        equipa += "\t\t :Equipa;\n"
        equipa += "\t:anoFundacao " + equipas[e].anoFundacao + ";\n"
        equipa += "\t:area \"" + equipas[e].area + "\";\n"
        equipa += "\t:coresClube \"" + equipas[e].coresClube + "\";\n"
        equipa += "\t:email \"" + equipas[e].email + "\";\n"
        equipa += "\t:nome \"" + equipas[e].nome + "\";\n"
        equipa += "\t:website \"" + equipas[e].website + "\";\n"
        equipa += "\t:nomeCurto \"" + equipas[e].nomeCurto + "\";\n"
        equipa += "\t:tla \"" + equipas[e].tla + "\".\n"
        console.log(equipa)
    }
    console.log("\n### Jogos ###\n")
    for (var j = 0; j < jogos.length; j++) {
        var jogo = ""
        jogo += ":j_" + jogos[j].id + " a owl:NamedIndividual,\n"
        jogo += "\t\t :Jogo;\n"
        jogo += "\t:jogaEmCasa :e_" + jogos[j].jogaEmCasa + ";\n"
        jogo += "\t:jogaFora :e_" + jogos[j].jogaFora + ";\n"
        jogo += "\t:data \"" + jogos[j].data + "\";\n"
        if (jogos[j].golosCasa == null) {
            jogo += "\t:golosCasa -1;\n"
        }
        else {
            jogo += "\t:golosCasa " + jogos[j].golosCasa + ";\n"
        }
        if (jogos[j].golosFora == null) {
            jogo += "\t:golosFora -1;\n"
        }
        else {
            jogo += "\t:golosFora " + jogos[j].golosFora + ";\n"
        }

        jogo += "\t:numeroDeJogo " + jogos[j].numeroDeJogo + ";\n"
        for (var a = 0; a < jogos[j].arbitros.length; a++) {
            jogo += "\t:eArbitrado :a_" + jogos[j].arbitros[a].id + ";\n"
        }
        jogo += "\t:vencedor \"" + jogos[j].vencedor + "\".\n"
        console.log(jogo)
    }

    console.log("\n### Arbitros ###\n")
    for (var a = 0; a < arbitros.length; a++) {
        arbitro = ""
        arbitro += ":a_" + arbitros[a].id + " a owl:NamedIndividual,\n"
        arbitro += "\t\t :Arbitro;\n"
        arbitro += "\t:nome \"" + arbitros[a].nome + "\".\n"
        console.log(arbitro)
    }

    console.log("\n### Classificações ###\n")
    for (var c = 0; c < classificacoes.length; c++) {
        var classificacao = ""
        classificacao += ":cl_" + classificacoes[c].id + " a owl:NamedIndividual,\n"
        classificacao += "\t\t :Classificacao;\n"
        classificacao += "\t:pertence :c_" + classificacoes[c].pertence + ";\n"
        classificacao += "\t:dizRespeito :e_" + classificacoes[c].equipa + ";\n"
        classificacao += "\t:nDerrotas " + classificacoes[c].nDerrotas + ";\n"
        classificacao += "\t:nVitorias " + classificacoes[c].nVitorias + ";\n"
        classificacao += "\t:nEmpates " + classificacoes[c].nEmpates + ";\n"
        classificacao += "\t:nGolosSofridos " + classificacoes[c].nGolosSofridos + ";\n"
        classificacao += "\t:nGolosMarcados " + classificacoes[c].nGolosMarcados + ";\n"
        classificacao += "\t:nJogos " + classificacoes[c].nJogos + ";\n"
        classificacao += "\t:diferencaDeGolos " + classificacoes[c].diferencaDeGolos + ";\n"
        classificacao += "\t:pontos " + classificacoes[c].pontos + ";\n"
        classificacao += "\t:posicaoTabela " + classificacoes[c].posicaoTabela + ".\n"
        console.log(classificacao)
    }
    console.log("\n### Jogadores ###\n")
    for (var p = 0; p < jogadores.length; p++) {
        var jogador = ""
        jogador += ":p_" + jogadores[p].id + " a owl:NamedIndividual,\n"
        jogador += "\t\t :Jogador;\n"
        for (j = 0; j < jogadores[p].jogaNaEquipa.length; j++) {
            jogador += "\t:jogaNaEquipa :e_" + jogadores[p].jogaNaEquipa[j] + ";\n"
        }
        jogador += "\t:dataNascimento \"" + jogadores[p].dataNascimento + "\";\n"
        jogador += "\t:nacionalidade \"" + jogadores[p].nacionalidade + "\";\n"
        jogador += "\t:paisNascimento \"" + jogadores[p].paisNascimento + "\";\n"
        jogador += "\t:posicao \"" + jogadores[p].posicao + "\";\n"
        jogador += "\t:nome \"" + jogadores[p].nome + "\".\n"
        console.log(jogador)
    }
    console.log("\n### Treinadores ###\n")
    for (var t = 0; t < treinadores.length; t++) {
        var treinador = ""
        treinador += ":t_" + treinadores[t].id + " a owl:NamedIndividual,\n"
        treinador += "\t\t :Treinador;\n"
        treinador += "\t:treina :e_" + treinadores[t].treina + ";\n"
        treinador += "\t:dataNascimento \"" + treinadores[t].dataNascimento + "\";\n"
        treinador += "\t:nacionalidade \"" + treinadores[t].nacionalidade + "\";\n"
        treinador += "\t:paisNascimento \"" + treinadores[t].paisNascimento + "\";\n"
        treinador += "\t:nome \"" + treinadores[t].nome + "\".\n"
        console.log(treinador)
    }
}).catch(e1 => console.log('Erro: ' + e1))

