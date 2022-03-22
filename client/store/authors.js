import axios from 'axios'

// action
const SET_AUTHORS = 'SET_AUTHORS';
const CREATE_AUTHOR = 'CREATE_AUTHOR';
const UPDATE_AUTHOR = 'UPDATE_AUTHOR';

// action creator
const setAuthors = (authors) => {
    return {
        type: SET_AUTHORS,
        authors
    }
}

const _createAuthor = (author) => {
    return {
        type: CREATE_AUTHOR,
        author
    }
}

const _editAuthor = (author) => {
    return {
        type: UPDATE_AUTHOR,
        author
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

export const createAuthor = (author, history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('/api/authors', author);
            dispatch(_createAuthor(data));
            history.push('/');
        } catch (err) {
            console.log(err)
        }
    }
}

export const editAuthor = (authorId, author, history) => {
    return async(dispatch) => {
        try {
            const { data } = await axios.put(`/api/authors/${authorId}`, author);
            dispatch(_editAuthor(data));
            history.push('/');
        } catch(ex) {
            console.log(ex)
        }
    }
}


const initialState = []

// reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHORS:
            return action.authors;
        case CREATE_AUTHOR:
            return [...state, action.author];
        case UPDATE_AUTHOR:
            return state.map( author => author.id === action.author.id ? action.author : author )
        default:
            return state
    }
}
