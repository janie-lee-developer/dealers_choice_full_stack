// redux
import { createStore, combineReducers, applyMiddleware } from 'redux';

// redux-logger
import { createLogger } from 'redux-logger';

// redux-thunks
import thunkMiddleware from 'redux-thunk';

// combine multiple redux middlewares
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers
import stories from './stories'
import singleStory from './singleStory'
import authors from './authors';
import singleAuthor from './singleAuthor'

const reducer = combineReducers({
    stories,
    singleStory,
    authors,
    singleAuthor
})

const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

const store = createStore(reducer, middleware)

export default store
