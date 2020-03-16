import React from 'react';
import Suggestions from "../Suggestions/Suggestions";
import "./Search.css";



const Search = (props) => {	
	
	const loupe = require('../../assets/search-solid.svg');
	let id = props.matches[0] != undefined ? props.matches[0].id : null
	
	
	return (

		<div className="search-wrapper">
			<form id={id} className="searchForm" onSubmit={props.isLoaded ? props.fetchID : props.handleFalseSubmit}>
					<input placeholder="Search for a city..." id="search" type="text" value={props.value} onChange={props.handleChange}/>
					<button>
						<img src={loupe} alt="search-img"/>
					</button>	
	     </form>
			 <p>For example: Kyiv, London, New York</p>
	     <Suggestions isLoaded={props.isLoaded} fetchID={props.fetchID} matches={props.matches}/>
		</div>

		)
	}


export default Search