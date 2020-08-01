import React from 'react';
import ReactDOM from 'react-dom';

// Redux imports
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';

import './index.css';
import WeatherApp from './App';
import * as serviceWorker from './serviceWorker';

// Create Redux store
const store = createStore(rootReducer);

// Add Redux wrapper
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<WeatherApp />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
