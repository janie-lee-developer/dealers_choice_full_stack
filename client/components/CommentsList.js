import React from 'react'

const CommentsList = (props) => {
    const { comments } = props;
    return (
        <div id='comments'>
            <h2>COMMENTS</h2>
            {console.log('comments', props)}
            {comments.map(comment => {
                return <div key={comment.id} className='commentRow'>
                    <img className='cmmtListAuthPic' src={`assets/${comment.author.imageUrl}`} />
                    <div className='column'>
                        <a>
                            <h5>{comment.author.name}</h5>
                        </a>
                        <div>{comment.content}</div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default CommentsList;
