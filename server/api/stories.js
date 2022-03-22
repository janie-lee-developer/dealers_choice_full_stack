// api router
const router = require('express').Router();

//db
const { models: { Story, Comment, Author } } = require('../db/index');

// GET /api/stories
router.get('/', async(req, res, next) => {
    try {
        const stories = await Story.findAll({
            where: req.query,
            attributes: ['id', 'title','createdAt', 'content'],
            include: [Author]
        });
        res.json(stories)
    }
    catch(ex) {
        next(ex)
    }
});

// GET /api/stories/:storyId
router.get('/:storyId', async (req, res, next) => {
    try {
        const story = await Story.findByPk(req.params.storyId, {
            include: [Author, { model: Comment, include: Author }]
        })
        res.json(story)
    }
    catch (error) {
        next(error)
    }
})

// CREATE
// POST /api/stories
router.post('/', async (req, res, next) => {
    try {
        const { authorName, authorBio, authorImageUrl, storyTitle, storyContent } = req.body;
        const newAuthor = await Author.create({ name: authorName, bio: authorBio, imageUrl: authorImageUrl });
        const newStory = await Story.create({ title: storyTitle, content: storyContent, authorId: newAuthor.id });
        const story = await Story.findByPk( newStory.id, {
            where: req.query,
            attributes: ['id', 'title', 'createdAt', 'content'],
            include: [Author]
        });
        res.status(201).send(story);
    } catch (ex) {
        next(ex);
    }
});

// UPDATE /api/stories/:id
router.put('/:id', async (req, res, next) => {
    try {
        const { authorName, authorBio, authorImageUrl, storyTitle, storyContent } = req.body;

        const story = await Story.findByPk(req.params.id);
        const author = await Author.findByPk(story.authorId);

        await story.update({ title: storyTitle, content: storyContent });
        await author.update({ name: authorName, bio: authorBio, imageUrl: authorImageUrl });

        const updatedStory = await Story.findByPk(req.params.id, {
            where: req.query,
            attributes: ['id', 'title', 'createdAt', 'content'],
            include: [Author]
        });

        res.status(201).send(updatedStory);
    } catch (ex) {
        next(ex)
    }
});


// DELETE /api/stories
router.delete('/:id', async(req, res, next) => {
    try {
        const story = await Story.findByPk(req.params.id);
        await story.destroy();
        res.send(story);
    } catch (ex) {
        next(ex);
    }
})


module.exports = router;
