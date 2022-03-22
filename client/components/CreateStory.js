import React, { Component } from 'react';

// thunk
import { createStory } from '../store/stories';
import { createAuthor } from '../store/authors';

// redux
import { connect } from 'react-redux';

class CreateStory extends Component {
    constructor() {
        super();
        this.state = {
                authorName: '',
                authorBio: '',
                authorImageUrl: '',
                storyTitle: '',
                storyContent: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { authorName, authorBio , authorImageUrl} = this.state;
        this.props.create({...this.state});
        this.props.addAuthor({ name: authorName, bio: authorBio, imageUrl: authorImageUrl });
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value });
        console.log(this.state);
    }

    render() {
        const { authorName, authorBio, storyTitle, storyContent } = this.state;
        const { handleSubmit, handleChange } = this;

        return (
            <form id='story-form' onSubmit={handleSubmit}>
                <label htmlFor='authorName'>Author Name: </label>
                <input name='authorName' value={authorName} onChange={handleChange} />

                <label htmlFor='authorBio'>Author Bio: </label>
                <textarea name='authorBio' value={authorBio} onChange={handleChange} />

                <label htmlFor='storyTitle'>Story Title: </label>
                <input name='storyTitle' value={storyTitle} onChange={handleChange} />

                <label htmlFor='storyContent'>Story Content: </label>
                <textarea name='storyContent' value={storyContent} onChange={handleChange} />

                <button className='submitBttn'type='submit'>Submit</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch, {history}) => ({
    create: (story) => dispatch(createStory(story, history)),
    addAuthor: (newAuthor) => dispatch(createAuthor(newAuthor, history))
});

export default connect(null, mapDispatchToProps)(CreateStory);