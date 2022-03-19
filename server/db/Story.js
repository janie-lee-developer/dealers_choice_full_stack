const conn = require('./conn');
const { TEXT, STRING } = conn.Sequelize;


const Story = db.define('story', {
    title: STRING,
    content: TEXT,
    imageUrl: STRING
})

module.exports = Story;