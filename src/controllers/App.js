import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import Result from './Result';

const KEY = 'd6667b19b17cd4e8cee6d7bf303311f7';

class App extends Component {

  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    wind: '',
    pressure: '',
    error: false
  };

    handleInputChange = event => {
        this.setState({
            value: event.target.value
        })
    }

  componentDidUpdate(prevState){

    if(this.state.value.length === 0 ) return;

    if(prevState.value !== this.state.value) {
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${KEY}&units=metric`;

      fetch(API)
          .then(response =>{
            if(response.ok){
              return response
            }
            throw Error('no success')
          })
          .then(response => response.json())
          .then(result => {
            const time = new Date().toLocaleString()
            this.setState ({
              date: time,  
              sunrise: result.sys.sunrise, 
              sunset: result.sys.sunset, 
              temp: result.main.temp,
              wind: result.wind.speed, 
              pressure: result.main.pressure,
              error: false,
              city: this.state.value
            })
          })
          .catch(error => {
            console.log(error);
            this.setState(prevState => ({
              error: true,
              city: prevState.value
            }))
          })
    }
  }

  render() {
    return (
      <div className="app">
        <Form
            value={this.state.value}
            change={this.handleInputChange}
        />
        <Result 
            weather={this.state}
        />
      </div>
    );
  }
}

export default App;
