import React, { useState } from 'react';
import './App.css';
import data from './data';

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
	const [showExtended, setShowExtended] = useState(false);
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
				onClick={() => setShowExtended(!showExtended)}
			>
				{showExtended ? 'Hide Forecast' : 'Show Forecast'}
			</button>
			{showExtended && (
				<ExtendedForecast
					forecast={props.city.forecast.forecast}
				></ExtendedForecast>
			)}
		</div>
	);
}

class GetCityForm extends React.Component {
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
						this.props.getWeatherInfo(this.state.cityName);
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
						this.setState({ cityName: e.target.value });
					}}
				></input>
			</form>
		);
	}
}

class WeatherApp extends React.Component {
	state = {
		cityInfo: null,
		errorText: '',
	};

	getWeatherData = (cityName) => {
		let result;
		for (const state in data.States) {
			result = data.States[state].cities.find(
				(city) => city.name.toUpperCase() === cityName.toUpperCase()
			);
			if (result) break;
		}
		if (result) {
			this.setState({
				cityInfo: { name: cityName, forecast: result },
			});
			this.setErrorMessage('');
		} else {
			this.setErrorMessage('city not found');
			this.setState({ cityInfo: null });
		}
	};

	setErrorMessage = (errorText) => {
		this.setState({ errorText });
	};

	render() {
		return (
			<div className="app">
				<h2 className="app-title">Weather App</h2>
				<GetCityForm
					setError={this.setErrorMessage}
					getWeatherInfo={this.getWeatherData}
				></GetCityForm>
				{this.state.errorText && (
					<div className="error">{this.state.errorText}</div>
				)}
				{this.state.cityInfo && (
					<WeatherInfo city={this.state.cityInfo}></WeatherInfo>
				)}
			</div>
		);
	}
}

export default WeatherApp;
