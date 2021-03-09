const getWeatherService = require('../core/weatherService')
const weatherService = getWeatherService();

module.exports.handler = async (event, context, callback) => {
console.log("event.pathParameters.zipcode,", event.pathParameters.zipcode)
 const weather = await weatherService.getWeather(event.pathParameters.zipcode);
 let response;

 if(weather && weather.temp_c) {
  const {temp_c, temp_f} = weather;
  const timestamp = new Date().getTime();
  const dbObject = {
   temp_c,
   temp_f,
   zipCode: parseInt(event.pathParameters.zipcode, 10),
   date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
   submittedAt: timestamp,
   updatedAt: timestamp,
  }

  response = {
   statusCode: 200,
   body: JSON.stringify({
    message: 'success',
    weather: {temp_c, temp_f},
    dbStatus: await weatherService.updateWeather(dbObject)
   })
  }
 } else {
  response = {
   statusCode: 500,
   body: JSON.stringify({
    message: weather,
   })
  }
 }

 callback(null, response);

};
