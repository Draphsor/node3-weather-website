const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const weatherstack_api_key = '9341d631b8c98d45883cc4aa129b9955'
    const url = 'http://api.weatherstack.com/current?access_key=' + weatherstack_api_key + '&query=' + latitude + ',' + longitude + '&units=f'
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else {
            if (body.current) {
                callback(undefined, 'The temperature is ' + body.current.temperature + '. It feels like ' + body.current.feelslike + '. ' + body.current.weather_descriptions[0] + '.')
            } else if (body.error) {
                callback(body.error.info, undefined)
            } else {
                callback('Undefined error.', undefined)
            }
        }

    })
}

module.exports = forecast