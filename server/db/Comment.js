const conn = require('./conn');
const { TEXT } = conn.Sequelize;


const Comment = db.define('comment', {
    content: TEXT
})

module.exports = Comment;