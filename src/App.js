import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import './App.css';

const mapStateToProps = (state) => ({
	weather: state.weather,
	error: state.error,
});

function ExtendedForecast(props) {
	console.log(props.forecast);
	return (
		<div className="extended">
			{props.forecast.map((i, index) => (
				<div className="extended__data" key={index}>
					<div>{new Date(i.Date).toLocaleDateString()}</div>
					<div>Temp: {i.temprature}&#176;</div>
					<div>Feels: {i.feels}&#176;</div>
				</div>
			))}
		</div>
	);
}

function WeatherInfo(props) {
	// const [showExtended, setShowExtended] = useState(false);
	const weather = useSelector((state) => state.weather);
	const dispatch = useDispatch();
	const currentForecast = props.city.forecast.forecast[0];

	return (
		<div className="weather-info">
			<h2>Weather data for {props.city.name}</h2>
			<p>Current Temperature: {currentForecast.temprature}&#176;</p>
			<p>Feels Like: {currentForecast.feels}&#176;</p>
			<p className="weather-info--time">
				As of {new Date(currentForecast.Date).toLocaleDateString()},{' '}
				{currentForecast.Time}
			</p>
			<button
				className="toggle-button"
				onClick={() => dispatch({ type: 'TOGGLE_EXTENDED' })}
			>
				{weather.showExtended ? 'Hide Forecast' : 'Show Forecast'}
			</button>
			{weather.showExtended && (
				<ExtendedForecast
					forecast={props.city.forecast.forecast}
				></ExtendedForecast>
			)}
		</div>
	);
}

class _GetCityForm extends React.Component {
	state = {
		cityName: '',
	};

	render() {
		return (
			<form
				className="city-form"
				onSubmit={(e) => {
					e.preventDefault();
					if (this.state.cityName !== '') {
						this.props.dispatch({
							type: 'GET_CITY',
							payload: { cityName: this.state.cityName },
						});
						this.props.dispatch({ type: 'HIDE_EXTENDED' });
					}
					this.setState({ cityName: '' });
				}}
			>
				<label htmlFor="city-name">City Name: </label>
				<input
					id="city-name"
					type="text"
					value={this.state.cityName}
					onChange={(e) => {
						if (
							this.props.weather.errorText ||
							this.props.error.errorText
						) {
							console.log('clear errors');
							this.props.dispatch({ type: 'ERROR_CLEAR' });
						}
						this.setState({ cityName: e.target.value });
					}}
				></input>
			</form>
		);
	}
}
const GetCityForm = connect(mapStateToProps)(_GetCityForm);

class WeatherApp extends React.Component {
	setErrorMessage = (errorText) => {
		this.setState({ errorText });
	};

	componentDidMount() {
		console.log(this.props);
	}

	render() {
		const errorText =
			this.props.weather.errorText || this.props.error.errorText;
		return (
			<div className="app">
				<h2 className="app-title">Weather App</h2>
				<GetCityForm></GetCityForm>
				{errorText && <div className="error">{errorText}</div>}
				{this.props.weather.cityInfo && (
					<WeatherInfo
						city={this.props.weather.cityInfo}
					></WeatherInfo>
				)}
			</div>
		);
	}
}

export default connect(mapStateToProps)(WeatherApp);
