const getWeatherService = require('../core/weatherService')
const weatherService = getWeatherService();

module.exports.handler = async (event, context, callback) => {
  console.log("event.pathParameters.zipcode,", event.pathParameters.zipcode)
  const weather = await weatherService.queryWeather(parseInt(event.pathParameters.zipcode), 10);
  let response;

  if(weather.length > 0) {
     response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success, Got result form weather dynamoDb table',
        weather
      }),
    };
  } else {
    response = {
      statusCode: 404,
      body: JSON.stringify({
        message: 'No record found in the weather dynamoDb table',
        weather
      })
    }
  }

  callback(null, response);

};
