import axios from 'axios'

//actions
const SET_STORIES = 'SET_STORIES';
const CREATE_STORY = 'CREATE_STORY';
const DELETE_STORY = 'DELETE_STORY';
const UPDATE_STORY = 'UPDATE_STORY';

// action creators
const _setStories = (stories) => {
    return {
        type: SET_STORIES,
        stories
    }
}

const _createStory = (story) => {
    return {
        type: CREATE_STORY,
        story
    }
}

const _deleteStory = (story) => {
    return {
        type: DELETE_STORY,
        story
    }
}

const _editStory = (story) => {
    return {
        type: UPDATE_STORY,
        story
    }
}


// thunks
export const fetchStories = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/api/stories')
            dispatch(_setStories(data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const createStory = (story, history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('/api/stories', story);
            dispatch(_createStory(data));
            history.push('/');
        } catch(err) {
            console.log(err)
        }
    }
}

export const deleteStory = (storyId) => {
    return async(dispatch) => {
        try {
            const { data } = await axios.delete(`/api/stories/${storyId}`);
            dispatch(_deleteStory(data));
            history.push('/');
        } catch (err) {
            console.log(err)
        }
    }
}

export const editStory = (storyId, story, history) => {
    return async(dispatch) => {
        try {
            console.log('received', storyId, story);
            const { data } = await axios.put(`/api/stories/${storyId}`, story );
            console.log('axios receipt', data)
            dispatch(_editStory(data));
            history.push('/');
        } catch (err) {
            console.log('editStory Error', err)
        }
    }
}

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_STORIES:
            return action.stories;
        case CREATE_STORY:
            return state = [...state, action.story];
        case DELETE_STORY:
            return state.filter((story) => story.id !== action.story.id );
        case UPDATE_STORY:
            return state.map((story)=> story.id === action.story.id? action.story : story)
        default:
            return state
    }
}
