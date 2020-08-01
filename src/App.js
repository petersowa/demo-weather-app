import React, { useState } from 'react';
import './App.css';

const data = {
	States: {
		IL: {
			currentdate: '04/05/2019',
			time: '02:59 PM',
			cities: [
				{
					name: 'Chicago',
					forecast: [
						{
							Date: '04/05/2019',
							Time: '2.59pm',
							temprature: 47,
							feels: 40,
						},
						{
							Date: '04/06/2019',
							Time: '2.59pm',
							temprature: 57,
							feels: 55,
						},
						{
							Date: '04/07/2019',
							Time: '2.59pm',
							temprature: 45,
							feels: 44,
						},
						{
							Date: '04/08/2019',
							Time: '2.59pm',
							temprature: 61,
							feels: 50,
						},
						{
							Date: '04/09/2019',
							Time: '2.59pm',
							temprature: 68,
							feels: 65,
						},
					],
				},
				{
					name: 'Naperville',
					forecast: [
						{
							Date: '04/05/2019',
							Time: '2.59pm',
							temprature: 47,
							feels: 40,
						},
						{
							Date: '04/06/2019',
							Time: '2.59pm',
							temprature: 59,
							feels: 54,
						},
						{
							Date: '04/07/2019',
							Time: '2.59pm',
							temprature: 47,
							feels: 46,
						},
						{
							Date: '04/08/2019',
							Time: '2.59pm',
							temprature: 63,
							feels: 62,
						},
						{
							Date: '04/09/2019',
							Time: '2.59pm',
							temprature: 70,
							feels: 68,
						},
					],
				},
			],
		},
		NY: {
			currentdate: '04/05/2019',
			time: '02:59 PM',
			cities: [
				{
					name: 'New York',
					forecast: [
						{
							Date: '04/05/2019',
							Time: '2.59pm',
							temprature: 57,
							feels: 50,
						},
						{
							Date: '04/06/2019',
							Time: '2.59pm',
							temprature: 67,
							feels: 65,
						},
						{
							Date: '04/07/2019',
							Time: '2.59pm',
							temprature: 55,
							feels: 54,
						},
						{
							Date: '04/08/2019',
							Time: '2.59pm',
							temprature: 71,
							feels: 60,
						},
						{
							Date: '04/09/2019',
							Time: '2.59pm',
							temprature: 78,
							feels: 75,
						},
					],
				},
				{
					name: 'Buffalo',
					forecast: [
						{
							Date: '04/05/2019',
							Time: '2.59pm',
							temprature: 58,
							feels: 40,
						},
						{
							Date: '04/06/2019',
							Time: '2.59pm',
							temprature: 68,
							feels: 64,
						},
						{
							Date: '04/07/2019',
							Time: '2.59pm',
							temprature: 57,
							feels: 46,
						},
						{
							Date: '04/08/2019',
							Time: '2.59pm',
							temprature: 63,
							feels: 62,
						},
						{
							Date: '04/09/2019',
							Time: '2.59pm',
							temprature: 40,
							feels: 48,
						},
					],
				},
			],
		},
		CA: {
			currentdate: '04/05/2019',
			time: '02:59 PM',
			cities: [
				{
					name: 'Los Angeles',
					forecast: [
						{
							Date: '04/05/2019',
							Time: '2.59pm',
							temprature: 67,
							feels: 50,
						},
						{
							Date: '04/06/2019',
							Time: '2.59pm',
							temprature: 77,
							feels: 65,
						},
						{
							Date: '04/07/2019',
							Time: '2.59pm',
							temprature: 65,
							feels: 54,
						},
						{
							Date: '04/08/2019',
							Time: '2.59pm',
							temprature: 71,
							feels: 60,
						},
						{
							Date: '04/09/2019',
							Time: '2.59pm',
							temprature: 78,
							feels: 75,
						},
					],
				},
				{
					name: 'San francisco',
					forecast: [
						{
							Date: '04/05/2019',
							Time: '2.59pm',
							temprature: 68,
							feels: 50,
						},
						{
							Date: '04/06/2019',
							Time: '2.59pm',
							temprature: 78,
							feels: 64,
						},
						{
							Date: '04/07/2019',
							Time: '2.59pm',
							temprature: 67,
							feels: 66,
						},
						{
							Date: '04/08/2019',
							Time: '2.59pm',
							temprature: 73,
							feels: 72,
						},
						{
							Date: '04/09/2019',
							Time: '2.59pm',
							temprature: 70,
							feels: 68,
						},
					],
				},
			],
		},
	},
};

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

	console.log(currentForecast);
	return (
		<div className="weather-info">
			<h2>Weather data for {props.city.name}</h2>
			<p>Current Temperature: {currentForecast.temprature}&#176;</p>
			<p>Feels Like: {currentForecast.feels}&#176;</p>
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
