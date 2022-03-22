import axios from 'axios'

// actions
const SET_SINGLE_AUTHOR = 'SET_SINGLE_AUTHOR';
const SET_COMMENTS = 'SET_COMMENTS';
const SET_STORIES = 'SET_STORIES';


// action creator
const setSingleAuthor = (author) => {
    return {
        type: SET_SINGLE_AUTHOR,
        author
    }
}

const setComments = (comments) => {
    return {
        type: SET_COMMENTS,
        comments
    }
}

const setStories = (stories) => {
    return {
        type: SET_STORIES,
        stories
    }
}

// thunks
export const fetchSingleAuthor = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/authors/${id}`);
            dispatch(setSingleAuthor(data));
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchComments = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/authors/${id}/comments`);
            dispatch(setComments(data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchStories = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/authors/${id}/stories`);
            dispatch(setStories(data))
        } catch (err) {
            console.log(err)
        }
    }
}

// state
const initialState = {
    info: {},
    comments: [],
    authstories: []
}

// reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SINGLE_AUTHOR:
            return state = { ...state, info: { ...action.author } };
        case SET_COMMENTS:
            return state = { ...state, comments: [...action.comments] };
        case SET_STORIES:
            return state = { ...state, authstories: [...action.stories] };
        default:
            return state
    }
}