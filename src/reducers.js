import { combineReducers } from 'redux';

import data from './data';

export const GET_WEATHER = 'GET_WEATHER';
export const GET_CITY = 'GET_CITY';
export const ERROR_CLEAR = 'ERROR_CLEAR';
export const ERROR_SET = 'ERROR_SET';

function errorReducer(state = { errorText: '' }, action) {
	switch (action.type) {
		case ERROR_CLEAR:
			return { ...state, errorText: '' };
		case ERROR_SET:
			return { ...state, errorText: action.payload };
		default:
			return state;
	}
}

function weatherReducer(state = data, action) {
	switch (action.type) {
		case ERROR_CLEAR:
			return { ...state, errorText: '' };
		case GET_WEATHER:
			return { ...state, data, errorText: '' };
		case GET_CITY:
			let result;
			const { cityName } = action.payload;

			for (const state in data.States) {
				result = data.States[state].cities.find(
					(city) => city.name.toUpperCase() === cityName.toUpperCase()
				);
				if (result) break;
			}

			if (result) {
				return {
					...state,
					cityInfo: {
						name: cityName,
						forecast: result,
						errorText: '',
					},
				};
			} else {
				return {
					...state,
					cityInfo: null,
					errorText: 'city not found',
				};
			}
		default:
			return state;
	}
}

export default combineReducers({
	error: errorReducer,
	weather: weatherReducer,
});
