// api router
const router = require('express').Router();

//db
const { models: { Story, Comment, Author } } = require('../db/index');

// GET /api/stories
router.get('/', async(req, res, next) => {
    try {
        const stories = await Story.findAll({
            where: req.query,
            attributes: ['id', 'title','createdAt'],
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

module.exports = router;
