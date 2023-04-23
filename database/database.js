const Sequelize = require('sequelize');

const connection = new Sequelize('gestao_pessoas', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;