const axios = require('axios');
const Futebol = module.exports;

normalize = function(response) {
    return response.results.bindings.map(obj =>
        Object.entries(obj)
            .reduce((new_obj, [k,v]) => (new_obj[k] = v.value, new_obj),
                    new Object()));
};

async function execQuery(q){
    try{
        var encoded = encodeURIComponent(q);
        response = await axios.get("http://localhost:7200/repositories/futebol" + '?query=' + encoded);
        return(normalize(response.data));
    }
    catch(error) {
        return('ERRO: ' + error)
    }
}

Futebol.listarCompeticoes = async () =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select ?c ?area ?nome where {  
        ?c a :Competicao .
        ?c :nome ?nome.
        ?c :area ?area.  
    } 
    order by(?c)`;

    var res = await execQuery(query);
    return res;
}

Futebol.listarEquipasPorCompeticao = async (id) =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select ?e ?nomeEquipa where { 
        :${id} :eCompostaPor ?e.
        ?e :nome ?nomeEquipa
    }`

    var res = await execQuery(query)
    return res
}

Futebol.listarClassificacoesPorCompeticao = async (id) =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select ?c ?pos ?e ?nome ?nome ?pontos ?nJogos ?nVitorias ?nEmpates ?nDerrotas ?nGolosMarcados ?nGolosSofridos ?diferencaDeGolos  where { 
        :${id} :eCompostaPor ?e.
        ?e :nome ?nome.
        ?e :temClassificacao ?c.
        ?c :posicaoTabela ?pos.
        ?c :pontos ?pontos.
        ?c :nJogos ?nJogos.
        ?c :nVitorias ?nVitorias.
        ?c :nEmpates ?nEmpates.
        ?c :nDerrotas ?nDerrotas.
        ?c :nGolosMarcados ?nGolosMarcados.
        ?c :nGolosSofridos ?nGolosSofridos.
        ?c :diferencaDeGolos ?diferencaDeGolos.
    }
    order by ?pos`

    var res = await execQuery(query)
    return res

} 

Futebol.listarJogosPorCompeticao = async (id) =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select ?j ?eC ?nomeC ?eF ?nomeF ?numeroDeJogo where { 
        :${id} :eConstituida ?j.
        ?j :jogaEmCasa ?eC.
        ?eC :nome ?nomeC.
        ?j :jogaFora ?eF.
        ?eF :nome ?nomeF.
        ?j :numeroDeJogo ?numeroDeJogo.
    }
    order by ?numeroDeJogo
    `

    var res = await execQuery(query)
    return res
}

Futebol.infoJogo = async (id) =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select ?eC ?nomeC ?eF ?nomeF ?gC ?gF ?numeroDeJogo ?data where { 
        :${id} :jogaEmCasa ?eC.
        ?eC :nome ?nomeC.
        :${id} :jogaFora ?eF.
        ?eF :nome ?nomeF.
        :${id} :golosCasa ?gC.
        :${id} :golosFora ?gF.
        :${id} :numeroDeJogo ?numeroDeJogo.
        :${id} :data ?data.
    }`

    var res = await execQuery(query)
    return res
}

Futebol.jogoArbitros = async (id) =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select ?a ?nome  where { 
        :${id} :eArbitrado ?a.
        ?a :nome ?nome.
    }`

    var res = await execQuery(query)
    return res
}


Futebol.infoEquipa = async (id) =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select ?nomeEquipa ?anoFundacao ?area ?coresClube ?email ?website ?nomeCurto ?tla ?idTreinador ?treinador where { 
        :${id} :nome ?nomeEquipa.
        :${id} :anoFundacao ?anoFundacao.
        :${id} :area ?area.
        :${id} :coresClube ?coresClube.
        :${id} :email ?email.
        :${id} :website ?website.
        :${id} :nomeCurto ?nomeCurto.
        :${id} :tla ?tla.
        :${id} :temTreinador ?idTreinador.
        ?idTreinador :nome ?treinador.
    }`

    var res = await execQuery(query)
    return res
}

Futebol.equipaJogadores = async (id) =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select ?j ?jogador where { 
        :${id} :temJogador ?j.
        ?j :nome ?jogador.
    }`

    var res = await execQuery(query)
    return res
}

Futebol.equipaJogos = async (id) =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select ?j ?nomeC ?nomeF ?numeroDeJogo where { 
        ?j a :Jogo.
        ?j :jogaEmCasa ?ec.
        ?ec :nome ?nomeC.
        ?j :jogaFora ?ef.
        ?ef :nome ?nomeF.
        ?j :numeroDeJogo ?numeroDeJogo
        filter(?ec = :${id} || ?ef = :${id}).
    }order by ?numeroDeJogo`
    
    var res = await execQuery(query)
    return res
}

Futebol.infoJogador = async (id) =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select ?e ?nomeEquipa ?nome ?dNasc ?nacionalidade ?paisNascimento ?posicao where { 
        :${id} :jogaNaEquipa ?e.
        ?e :nome ?nomeEquipa.
        :${id} :nome ?nome.
        :${id} :dataNascimento ?dNasc.
        :${id} :nacionalidade ?nacionalidade.
        :${id} :paisNascimento ?paisNascimento.
        :${id} :posicao ?posicao
    }`
    
    var res = await execQuery(query)
    return res
}

Futebol.infoTreinador = async (id) =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select ?e ?nomeEquipa ?nome ?dNasc ?nacionalidade ?paisNascimento where { 
        :${id} :treina ?e.
        ?e :nome ?nomeEquipa.
        :${id} :nome ?nome.
        :${id} :dataNascimento ?dNasc.
        :${id} :nacionalidade ?nacionalidade.
        :${id} :paisNascimento ?paisNascimento.
    }`
    
    var res = await execQuery(query)
    return res
}

Futebol.listarArbitros = async () =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select ?a ?nome  where { 
        ?a a :Arbitro.
        ?a :nome ?nome.
    }`
    
    var res = await execQuery(query)
    return res
}

Futebol.infoArbitro = async (id) =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select ?nome  where { 
        :${id} a :Arbitro.
        :${id} :nome ?nome.
    }`
    
    var res = await execQuery(query)
    return res
}


Futebol.countCompeticoes = async () =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select (count(?s) as ?nCompeticoes) where { 
        ?s a :Competicao
    }`
    
    var res = await execQuery(query)
    return res
}

Futebol.countJogos = async () =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select (count(?s) as ?nJogos) where { 
        ?s a :Jogo
    }`
    
    var res = await execQuery(query)
    return res
}

Futebol.countEquipas = async () =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select (count(?s) as ?nEquipas) where { 
        ?s a :Equipa
    }`
    
    var res = await execQuery(query)
    return res
}

Futebol.countJogadores = async () =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select (count(?s) as ?nJogadores) where { 
        ?s a :Jogador
    }`
    
    var res = await execQuery(query)
    return res
}


Futebol.countTreinadores = async () =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select (count(?s) as ?nTreinadores) where { 
        ?s a :Treinador
    }`
    
    var res = await execQuery(query)
    return res
}


Futebol.countArbitros = async () =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/futebol#>
    select (count(?s) as ?nArbitros) where { 
        ?s a :Arbitro
    }`
    
    var res = await execQuery(query)
    return res
}