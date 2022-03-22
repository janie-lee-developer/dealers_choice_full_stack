// react
import React, { Component } from 'react';

// child components
import Navbar from './Navbar';
import AllStories from './AllStories';
import AllAuthors from './AllAuthors';
import SingleAuthor from './SingleAuthor';
import SingleStory from './SingleStory';

// redux
import {connect} from 'react-redux';

//thunks
import { fetchStories } from '../store/stories'
import { fetchAuthors } from '../store/authors'

// react-router
import { HashRouter as Router, Route } from 'react-router-dom';


class App extends Component {
    componentDidMount() {
        this.props.loadStories();
        this.props.loadAuthors();
    }

    render() {
        return (
            <Router>
                <Navbar />
                <Route component={AllStories} exact path='/' />
                <Route component={AllStories} exact path='/stories' />
                <Route component={SingleStory} path='/stories/:storyId' />
                <Route component={AllAuthors} exact path='/authors' />
                <Route component={SingleAuthor} path='/authors/:authorId' />
            </Router>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadStories: () => dispatch(fetchStories()),
        loadAuthors: () => dispatch(fetchAuthors())
    }
}

export default connect(null, mapDispatchToProps)(App)
