const conn = require('./conn');

// db modules
const Author = require('./Author');
const Comment = require('./Comment');
const Story = require('./Story');

// associations
Author.hasMany(Story);
Story.belongsTo(Author);

Author.hasMany(Comment);
Comment.belongsTo(Author);

Story.hasMany(Comment);
Comment.belongsTo(Story);

// seed
const syncAndSeed = async () => {
    await conn.sync({ force: true });

    const authors = await Promise.all([
        Author.create({ name: 'Jessica', bio: `${faker.lorem.paragraphs(3)}`, imageUrl: 'jessica.png'}),
        Author.create({ name: 'Janie', bio: `${faker.lorem.paragraphs(3)}`, imageUrl: 'janie.png'}),
        Author.create({ name: 'Mark', bio: `${faker.lorem.paragraphs(3)}`, imageUrl: 'mark.png' })
    ]);

    
}

module.exports = {
    models: {
        Author,
        Comment,
        Story
    },
    syncAndSeed
}