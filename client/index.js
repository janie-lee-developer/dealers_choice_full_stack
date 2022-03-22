// react
import React from 'react';
import { render } from 'react-dom';

// redux
import {Provider} from 'react-redux';
import store from './store/index';

// child component
import App from './components/App';

render(
    <Provider store={store}>
        <App />
    </Provider>
, document.querySelector('#root'));