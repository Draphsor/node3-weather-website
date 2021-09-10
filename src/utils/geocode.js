const request = require('request')

const geocode = (address, callback) => {
    const mapbox_api_key = 'pk.eyJ1IjoiZHJhcGhzb3IiLCJhIjoiY2tzaHplZW9hMDI5NzJwcW1rcHhzdzZnYSJ9.otv81cZ-ojcWhH6p8fn8rQ'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + mapbox_api_key

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features === undefined) {
            callback('No location found.', undefined)
        } else if (body.features.length === 0) {
            callback('No location found.', undefined)
        } else {
            const result = body.features[0]
            callback(undefined, {
                longitude: result.center[0],
                latitude: result.center[1],
                location: result.place_name
            })
        }
    })
}

module.exports = geocode