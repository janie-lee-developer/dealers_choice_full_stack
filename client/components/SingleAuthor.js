import React from 'react'

// REDUX
import { fetchSingleAuthor, fetchComments, fetchStories } from '../store/singleAuthor'
import { connect } from 'react-redux'

// child component
import CommentsList from './CommentsList';
import StoriesList from './StoriesList';

// react-router
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';


class SingleAuthor extends React.Component {
    componentDidMount() {
        this.props.loadSingleAuthor(this.props.match.params.authorId);
        this.props.loadComments(this.props.match.params.authorId);
        this.props.loadStories(this.props.match.params.authorId);
    }

    render() {
        console.log('this', this.props)
        const singleAuthor = this.props.singleAuthor.info;
        const comments = this.props.singleAuthor.comments;
        const stories = this.props.singleAuthor.authstories;
        ///#/authors/2
        return (
            <div id='single-author' className='column'>
                <div id='single-author-detail' className='row'>
                    <div className='column mr1'>
                        <img className='authorProfilePic' src={`assets/${singleAuthor.imageUrl}`} />
                        <h1>{singleAuthor.name}</h1>
                        <p>{singleAuthor.bio}</p>
                    </div>
                </div>
                <div id='single-author-nav'>
                    <Link to={`/authors/${singleAuthor.id}/stories`}>Stories</Link>
                    <Link to={`/authors/${singleAuthor.id}/comments`}>Comments</Link>
                </div>
                <hr />
                <div>
                    <Route exact path="/authors/:authorId/stories" render={(routeProps) => <StoriesList stories={stories} routeProps={routeProps} />} />
                    <Route exact path="/authors/:authorId/comments" render={(routeProps) => <CommentsList comments={comments} routeProps={routeProps} />} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ singleAuthor: state.singleAuthor });

const mapDispatchToProps = dispatch => ({
    loadSingleAuthor: id => dispatch(fetchSingleAuthor(id)),
    loadComments: id => dispatch(fetchComments(id)),
    loadStories: id => dispatch(fetchStories(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleAuthor)