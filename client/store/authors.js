import axios from 'axios'

// action
const SET_AUTHORS = 'SET_AUTHORS'

// action creator
export const setAuthors = (authors) => {
    return {
        type: SET_AUTHORS,
        authors
    }
}

// thunk 
export const fetchAuthors = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/api/authors');
            dispatch(setAuthors(data));
        } catch (err) {
            console.log(err)
        }
    }
}

const initialState = []

// reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHORS:
            return action.authors
        default:
            return state
    }
}
