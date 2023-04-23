const Sequelize = require('sequelize');
const connection = require('./database');

const Tarefas = connection.define('tarefas', {
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    pessoaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Tarefas.sync({ force: false }).then(() => {

});

module.exports = Tarefas;