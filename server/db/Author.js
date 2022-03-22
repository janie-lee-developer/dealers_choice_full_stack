const conn = require('./conn');
const { STRING, TEXT } = conn.Sequelize;


const Author = conn.define('author', {
    name: STRING,
    bio: TEXT,
    imageUrl: STRING
})

module.exports = Author;