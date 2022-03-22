import React from 'react'
import { connect } from 'react-redux'

// react-routes
import { Link } from 'react-router-dom'

const StoriesList = (props) => {
    console.log(props);
    const stories = props.stories
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
                    </div>
                ))
            }
        </div>
    )
}

export default StoriesList;
