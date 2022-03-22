import React from 'react'
import { connect } from 'react-redux'

// react-routes
import { Link } from 'react-router-dom'

// thunks
import { deleteStory , editStory } from '../store/stories'

const StoriesList = (props) => {
    // passed prop from All Stories
    const stories = props.stories

    // dispatch methods from redux store
    const { destroy, edit, history } = props;
    return (
        <div id='stories' >
            <h2>STORIES</h2>
            {
                stories.map(story => (
                    <div className='story' key={story.id}>
                        <Link className='links' to={`/stories/${story.id}`}>
                            <h3 className='storyTitle'>{story.title}</h3>
                        </Link>
                        <div>
                            <Link className='links authorThumbnail' to={`/authors/${story.author.id}`}>
                                <p className='authorThumb'><img src={`assets/${story.author.imageUrl}`} className="authorThumbPics" />{story.author.name}</p>
                            </Link>
                            <p>{new Date(story.createdAt).toLocaleString()}</p>
                        </div> 
                        <div className='bttn-row'>
                            <button onClick={() => { destroy(story.id)}}>Delete</button>
                            <Link to={`/stories/${story.id}/edit`}><button>Edit</button></Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

const mapDispatchToProps = (dispatch, props) => ({
    destroy: (storyId) => dispatch(deleteStory(storyId)),
    edit: (storyId) => dispatch(editStory(storyId))
})

export default connect(null, mapDispatchToProps)(StoriesList);
