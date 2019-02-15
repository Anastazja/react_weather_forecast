import React from 'react';

const Result = (props) => {
    const {
        date, city, sunrise, sunset, temp, wind, pressure, error
    } = props.weather;

    let content = null;

    if(!error && city){
        const sunriseTipe = new Date(sunrise * 1000).toLocaleTimeString();
        const sunsetTipe = new Date(sunset * 1000).toLocaleTimeString();
        content = (
            <React.Fragment>
                <h3>Pogoda dla: <em>{city}</em></h3>
                <h4>na dzień: {date}</h4>
                <h4>Słońce wstaje o: {sunriseTipe}</h4>
                <h4>Zachód słońca o: {sunsetTipe}</h4>
                <h4>Temperatura: {temp} &#176;C</h4>
                <h4>Wiatr: {wind} m/s</h4>
                <h4>Ciśnienie: {pressure} hPa</h4>
            </React.Fragment>
        )
    }

    return (
        <div className="result">
            { error ? `Nie mamy w bazie ${city}` : content }
        </div>
    );
};

export default Result;

