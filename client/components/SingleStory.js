import React from 'react'

// REDUX
import { fetchSingleStory } from '../store/singleStory'
import { connect } from 'react-redux'

// child components
import CommentsList from './CommentsList';

// Routes send props to component.
class SingleStory extends React.Component {
    componentDidMount() {
        this.props.loadSingleStory(this.props.match.params.storyId)
    }

    render() {
        console.log(this.props)
        const story = this.props.story;
        const content = story.content || '';
        const comments = story.comments || [];

        return (
            <div id='single-story' className='column'>
                <h1 className='singleStoryHeader'>{story.title}</h1>
                <p>{content}</p>
                {/* <h3>Responses:</h3> */}
                <CommentsList comments={comments} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        story: state.singleStory
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadSingleStory: (id) => dispatch(fetchSingleStory(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleStory)