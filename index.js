const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const PessoasModel = require('./database/Pessoas');
const TarefasModel = require('./database/Tarefas');

connection.authenticate()
    .then(() => {
        console.log('Conexão estabelecida com o database!');
    })
    .catch((error) => {
        console.log(error);
    });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {

    PessoasModel.findAll({
        raw: true,
        order:[
            ['id', 'DESC']
        ]
    }).then(pessoas => {
        res.render('index', {
            pessoas: pessoas
        });
    });

});

app.get('/cadastrar-pessoa', (req, res) => {
    res.render('cadastrar');
});

app.post('/salvar-pessoa', (req, res) => {

    nome   = req.body.nome;
    email  = req.body.email;
    funcao = req.body.funcao;

    PessoasModel.create({
        nome: nome,
        email: email,
        funcao: funcao
    }).then(() => {
        res.redirect('/');
    });

    //res.send(nome+' - '+email+' - '+funcao);

});

app.get('/tarefa/:id?', (req, res) => {

    let id = req.params.id ? req.params.id : false;

    PessoasModel.findOne({
        where: {
            id: id
        }
    }).then(pessoa => {

        if(pessoa != undefined){

            //buscar todas as tarefas da pessoa
            TarefasModel.findAll({
                raw: true,
                where: {
                    pessoaId: id
                },
                order: [
                    ['id', 'DESC']
                ]
            }).then(tarefas => {
                res.render('tarefa', {
                    pessoa: pessoa,
                    tarefas: tarefas
                });
            });

        }else{
            res.redirect('/');
        }

    });
    
});

app.post('/salvar-tarefa', (req, res) => {

    var pessoaId  = req.body.pessoaId;
    var descricao = req.body.descricao;
    
    TarefasModel.create({
        descricao: descricao,
        pessoaId: pessoaId
    }).then(() => {
        res.redirect('tarefa/'+pessoaId);
    });

});

app.listen('3000', () => {
    console.log('APP Rodando na porta 3000!');
});

