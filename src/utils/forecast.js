const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&appid=07737dc8cfb9154126b0575c557b7e3e&units=metric'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if(body.error) {
            callback("Unable to find the location", undefined)
        } else {
            callback(undefined, {
                temp: body.main.temp,
                weather: body.weather[0].main,
                description: body.weather[0].description
            })
        }
    })
}

module.exports = forecast

