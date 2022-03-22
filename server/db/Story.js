const conn = require('./conn');
const { TEXT, STRING } = conn.Sequelize;


const Story = conn.define('story', {
    title: STRING,
    content: TEXT
})

module.exports = Story;