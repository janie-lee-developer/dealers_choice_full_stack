const conn = require('./conn');
const { TEXT } = conn.Sequelize;


const Comment = conn.define('comment', {
    content: TEXT
})

module.exports = Comment;