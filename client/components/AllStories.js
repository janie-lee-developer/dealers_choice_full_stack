import React from 'react'

// redux
import { connect } from 'react-redux'

// thunks
import { fetchStories } from '../store/stories'

// child component
import StoriesList from './StoriesList';

class AllStories extends React.Component {
    componentDidMount() {
        this.props.loadStories();
    }

    render() {
        return (
            <StoriesList stories={this.props.stories} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stories: state.stories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadStories: () => dispatch(fetchStories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllStories)

