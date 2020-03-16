import React from 'react';
import "./Suggestions.css"


const Suggestions = (props) => {
	
	const matches = props.matches

	.map((val) => {
		return (
			
				<li id={val.id} key={val.id} onClick={props.fetchID}>
					{val.name ? val.name + ", " : null}
					{val.state ? val.state + ", " : null}
					{val.country ? val.country : null}
				</li>	
			
			)
	})
	.slice(0, 50)


	//Using inline styles to hide or show Suggestions box
	let styles = matches.length === 0 ? {display: "none"} : matches.length > 5 ? {height: "300px", display: "block"} : matches.length > 0 ? {display: "block"} : null
	
	return (
			<ul style={styles} className="suggestions">
				{props.isLoaded ? matches : null}
			</ul>
		)
	}

export default Suggestions