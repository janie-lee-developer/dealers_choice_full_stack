//db
const { syncAndSeed } = require('./db/index');

//express
const express = require('express');
const { static } = express;
const app = express();

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//path for static files
const path = require('path');

//webpack static files route
// app.use('/dist', static(path.join(__dirname, '../dist')));
// automatically made public folder/ bundle.js by adding output prop in webpack.config.js file.
// remove the dist/main.js folder.
// update static path for webpack to be /public instead of /dist
app.use('/public', static(path.join(__dirname, '../public')));

//assets folder
app.use('/assets', express.static(path.join(__dirname, '../assets')));

//routes
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, '../index.html')));
app.use('/api', require('./api'));

// This middleware will catch any URLs resembling a file extension
// for example: .js, .html, .css
// This allows for proper 404s instead of the wildcard '#<{(|' catching
// URLs that bypass express.static because the given file does not exist.
app.use((req, res, next) => {
    if (path.extname(req.path).length > 0) {
        res.status(404).end()
    } else {
        next()
    }
})

// Error catching endware
app.use((err, req, res, next) => {
    console.error(err, typeof next)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})


const init = async() => {
    try {
        await syncAndSeed();

        const port = process.env.PORT || 3001;
        app.listen(port, () => console.log(`listening on port ${port} || http://localhost:${3001}/`));
    } 
    catch(ex) {
        console.log(ex);
    }
}

init();