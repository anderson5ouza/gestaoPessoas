const Sequelize = require('sequelize');
const connection = require('./database');

//estrutura da tabela pessoas
const Pessoas = connection.define('pessoas', {
    nome: {
        type: Sequelize.STRING,
        allowNell: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    funcao: {
        type: Sequelize.TEXT,
        allowNull: false
    }    
});

Pessoas.sync({force: false});

module.exports = Pessoas;