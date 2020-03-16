import React from 'react';
import "./Weather.css"
import Moment from 'react-moment';
import 'moment-timezone';

const Weather = (props) => {
	
	const icon = `http://openweathermap.org/img/wn/${props.icon}@2x.png`

	var date = new Date(Date.now());
    var newDate = date.toString();

	return (

		<div className="weather">

      		{props.data.name ? <Moment className="date" format="DD.MM.YYYY">{newDate}</Moment> : null}

			<h1>{props.data.name ? props.data.name +  ", " : null} {props.data.country ? props.data.country : null}</h1>
			<h2>{props.data.temperature ? props.data.temperature + '\u00b0C' : null}</h2>
			
			<div className="temperatures">
				<p>{props.data.temp_min ? "min " + props.data.temp_min + '\u00b0C' : null}</p>
				<p>{props.data.temp_max ? "max " + props.data.temp_max + '\u00b0C' : null}</p>
			</div>

			<h2>{props.data.temp_feels ? "feels like " + props.data.temp_feels + '\u00b0C' : null}</h2>	
			<h1>{props.data.main}</h1>
			<h3>{props.data.description}</h3>

			{props.data.name ? <img src={icon} alt="weather-img"/> : null }

			<div className="weather-state">
				<p>{props.data.wind ? "Wind speed: " + props.data.wind + " m/s" : null} </p>
				<p>{props.data.pressure ? "Pressure: " + props.data.pressure + " mm" : null} </p>		
				<p>{props.data.humidity ? "Humidity: " + props.data.humidity + "%" : null}</p>
			</div>
			
		</div>	

		)
  }

export default Weather