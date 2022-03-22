const conn = require('./conn');
const faker = require('faker')

// db modules
const Author = require('./Author');
const Comment = require('./Comment');
const Story = require('./Story');

// associations
Author.hasMany(Story);
Story.belongsTo(Author); //authorId

Author.hasMany(Comment);
Comment.belongsTo(Author); //authorId

Story.hasMany(Comment);
Comment.belongsTo(Story);//storyId

// seed
const syncAndSeed = async () => {
    await conn.sync({ force: true });

    // creating 3 default authors.
    const authors = await Promise.all([
        Author.create({ name: 'Jessica', bio: `${faker.lorem.paragraphs(3)}`, imageUrl: 'jessica.png'}),
        Author.create({ name: 'Janie', bio: `${faker.lorem.paragraphs(3)}`, imageUrl: 'janie.png'}),
        Author.create({ name: 'Mark', bio: `${faker.lorem.paragraphs(3)}`, imageUrl: 'mark.png' })
    ]);

    // making sure the author him/herself is not commeting to him/herself.
    const generateRandAuthor = (writer) => {
        let rand = authors[Math.floor(Math.random() * authors.length)];
        while (writer === rand.name) {
            rand = authors[Math.floor(Math.random() * authors.length)];
        }
        return rand;
    }

    // setting each author 3 random stories and then creating 2 cmnt for each story.
    authors.forEach(async (author, i) => {
        for (let i = 1; i < 4; i++) {
            const story = await Story.create({ title: `${author.name}'s story ${i}`, content: faker.lorem.paragraphs(3), imageUrl: 'defaultStory.png', authorId: author.id });
            const commenter = generateRandAuthor(author.name);
            await Comment.create({ content: `${author.name}, I love your story! Keep it up!`, storyId: story.id, authorId: commenter.id });
            await Comment.create({ content: `This is amazing!! ${author.name}, you are amazing!`, storyId: story.id, authorId: generateRandAuthor(commenter.name).id});
        };
    });
    
}

module.exports = {
    conn,
    models: {
        Author,
        Comment,
        Story
    },
    syncAndSeed
}