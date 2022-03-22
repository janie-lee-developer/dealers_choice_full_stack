const conn = require('./conn');
const { TEXT, STRING } = conn.Sequelize;


const Story = conn.define('story', {
    title: STRING,
    content: TEXT,
    imageUrl: STRING
})

module.exports = Story;