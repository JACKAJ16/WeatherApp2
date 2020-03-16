import React from 'react';
import './App.css';
import Search from "./components/Search/Search";
import Weather from "./components/Weather/Weather";
import axios from "axios";


const API_KEY = "6c2847c395792f9cf85a804db24ced16";

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      main: "",
      description: "",
      temperature: "",
      temp_max: "",
      temp_min: "",
      temp_feels: "",
      wind: "",
      pressure: "",
      humidity: "",
      id: "",
      name: "",
      country: "",
      state: "",
      isLoaded: false,
      matches: [],
      value: "",
      basicBg: "BasicBg",
      icon: "",
      data: []
    }
  }



//Fetching data from json file with cities id's for suggestion box

  componentDidMount() {
    axios.get("https://raw.githubusercontent.com/JACKAJ16/Cities-json/master/citylist.json")
      .then(res => {
        this.setState({
          data: res.data
        })
      })
  }



//Background updates due to the main weather state

  componentDidUpdate() {
    const weatherBg = require(`./assets/${this.state.main !== "" ? this.state.main : this.state.basicBg }.jpg`);
    document.body.style.background = '#000 url('+weatherBg+')  no-repeat top center / cover';
  }




//Fetching weather data from API 

  fetchID = async(e) => {
    e.preventDefault()
    let cityId = e.target.id
    
      axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric`)
      .then(res => {
        this.setState({
          main: res.data.weather[0].main,
          description: res.data.weather[0].description,
          temperature: res.data.main.temp,
          temp_max: res.data.main.temp_max,
          temp_min: res.data.main.temp_min,
          wind: res.data.wind.speed,
          pressure: res.data.main.pressure,
          humidity: res.data.main.humidity,
          temp_feels: res.data.main.feels_like,
          name: res.data.name,
          country: res.data.sys.country,
          state: res.data.state,
          isLoaded: false,
          value: "",
          icon: res.data.weather[0].icon
        })
      }) 
   
  }


//Suggestions box method to compare input and cities in JSON file
  handleChange = async(e) => {    
 
    let matches = this.state.data.filter(state => {
      const regex = new RegExp(`^${e.target.value}`, "gi");
      return state.name.match(regex) || state.country.match(regex);
    })
    
    if (e.target.value.length === 0) {
      matches = []
    } else if (e.target.value.length === 1 || e.target.value.length === 2) {
      matches = matches.slice(0, 5)
    }
  

    this.setState({
      matches: matches
      .sort((a, b) => { 
            return (
              a.name > b.name ? 1 : a.name < b.name ? -1 :  0
              )}),

      value: e.target.value,
      isLoaded: true
    })

  }



  //Preventing page refresh while user presses search button with no suggestions on the screen
  handleFalseSubmit(e) {
    e.preventDefault()
  }
    
  

  render() {
    return (
      <div className="App">
        <Search handleFalseSubmit={this.handleFalseSubmit} isLoaded={this.state.isLoaded} handleChange={this.handleChange} matches={this.state.matches} value={this.state.value} fetchID={this.fetchID} />
        <Weather date={this.state.date} icon={this.state.icon} data={this.state} />
      </div>
    );

  }
}

export default App;
