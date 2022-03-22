import React, { Component } from 'react';

// thunk
import { editStory } from '../store/stories';
import { editAuthor } from '../store/authors';

// redux
import { connect } from 'react-redux';

class EditStory extends Component {
    // redux route passing props
    constructor(props) {
        super(props);
        const { story } = this.props;
        this.state = {
            authorName: story ? story.author.name : '',
            authorBio: story ? story.author.bio : '',
            authorImageUrl: story ? story.author.imageUrl : '',
            storyTitle: story ? story.title : '',
            storyContent: story ? story.content : ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // componentDidUpdate is called when state/store is updated.
    // before mapStateToProps, the states are unidentified. After mapStateToProps store is ran, this LC will run and
    // set react state to the newly received store data.
    // conclusion: everytime when store data is updated, this LC is called, this LC will setState w the new data.
    componentDidUpdate(prevProp) {
        const {story} = this.props
        if (!prevProp.story) {
            this.setState({
                authorName: story.author.name,
                authorBio: story.author.bio,
                authorImageUrl: story.author.imageUrl,
                storyTitle: story.title,
                storyContent: story.content
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { authorName, authorBio, authorImageUrl } = this.state;
        this.props.edit(this.props.match.params.storyId, {...this.state});
        this.props.editAuthor(this.props.story.author.id, {name: authorName, bio: authorBio, imageUrl: authorImageUrl});
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        // react state
        const { authorName, authorBio, storyTitle, storyContent } = this.state;
        const { handleSubmit, handleChange } = this;
        return (
            <form id='story-form' onSubmit={handleSubmit}>
                <label htmlFor='authorName'>Author Name: </label>
                <input name='authorName' value={authorName || ''} onChange={handleChange} />

                <label htmlFor='authorBio'>Author Bio: </label>
                <textarea name='authorBio' value={authorBio || ''} onChange={handleChange} />

                <label htmlFor='storyTitle'>Story Title: </label>
                <input name='storyTitle' value={storyTitle || ''} onChange={handleChange} />

                <label htmlFor='storyContent'>Story Content: </label>
                <textarea name='storyContent' value={storyContent || ''} onChange={handleChange} />

                <button className='submitBttn' type='submit'>Submit</button>
            </form>
        )
    }
}

const mapStateToProps = ({ stories }, props)  => ({
    story: stories.find(story => {
        return story.id === parseInt(props.match.params.storyId)
    })
});

const mapDispatchToProps = (dispatch, props ) => ({
    edit: (storyId, newstory) => dispatch(editStory(storyId, newstory, props.history)),
    editAuthor : (authorId, newAuthor) => dispatch(editAuthor(authorId, newAuthor, props.history))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStory);

