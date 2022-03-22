import React from 'react'

// react router
import { Link } from 'react-router-dom';

const CommentsList = (props) => {
    const { comments } = props;
    return (
        <div id='comments'>
            <h2>COMMENTS</h2>
            {console.log('comments', props)}
            {comments.map(comment => {
                return <div key={comment.id} className='commentRow'>
                    <div className='column'>
                        <Link to={`/authors/${comment.author.id}`} className='authorsLink'>
                            <img className='cmmtListAuthPic' src={`assets/${comment.author.imageUrl}`} />
                            <h5>{comment.author.name}</h5>
                        </Link>
                        <div>{comment.content}</div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default CommentsList;
