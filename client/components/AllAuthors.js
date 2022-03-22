import React from 'react'

// REDUX
import { connect } from 'react-redux';

// react router
import { Link } from 'react-router-dom';

// const AllAuthors = ({ authors }) => {
//     console.log(authors);
//     return (
//         <div className='authors'>
//             <h2>Authors</h2>
//             {
//                 authors.map(author => {
//                     return <Link to={`/authors/${author.id}`} key={author.id} className='authorsLink'>
//                         <div className='authorRow' key={author.id}>
//                             <img className="authorThumbPics" src={`/assets/${author.imageUrl}` }/>
//                             <p>{author.name}</p>
//                         </div>
//                     </Link>
//                 })
//             }
//         </div>
//     )
// }

class AllAuthors extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            authors : this.props.authors ? this.props.authors : []
        }
    }

    componentDidUpdate(prevProp, ){
        if (prevProp.authors !== this.props.authors ) {
            this.setState({authors: this.props.authors})
        }
    }

    render () {
        // const { authors } = this.props
        const { authors } = this.state;
        return (
            <div className='authors'>
                <h2>Authors</h2>
                {
                    authors.map(author => {
                        return <Link to={`/authors/${author.id}`} key={author.id} className='authorsLink'>
                            <div className='authorRow' key={author.id}>
                                <img className="authorThumbPics" src={`/assets/${author.imageUrl}`} />
                                <p>{author.name}</p>
                            </div>
                        </Link>
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authors: state.authors
    }
}


export default connect(mapStateToProps)(AllAuthors)