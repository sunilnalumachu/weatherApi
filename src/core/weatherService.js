'use strict';

const axios = require('axios');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const weatherService = () => {
  /*
  *  getWeather - get the weather information for given zipcode.
  *
  */
  const getWeather = async (zip) => {
    return await axios
      .get(`https://api.weatherapi.com/v1/forecast.json?key=245967623d514a70bcc05954210503&q=${zip}&days=1&aqi=no&alerts=yes`)
      .then((response) => {
        return response.data.current;
      })
      .catch((err) => {
        console.log("Error from weather Api, the given zipCode is invalid and didnt got weather information, please try another one", err);
        return "Error from weather Api, the given zipCode is invalid and didnt got weather information, please try another one";
      });
  };


  /*
  *  updateWeather - updated the weather information for given zipcode in dynamoDb table.
  *
  */
  const updateWeather = async (weatherObj) => {
    const weatherInfo = {
      TableName: process.env.WEATHER_TABLE,
      Item: weatherObj,
    };
    return dynamoDb.put(weatherInfo).promise()
      .then(res => weatherObj);
  };


  /*
   *  queryWeather - queryWeather the weather information for given zipcode in dynamoDb table.
   *
   */
  const queryWeather = async (zipCode) => {
      const params = {
        TableName: process.env.WEATHER_TABLE,
        KeyConditionExpression: 'zipCode = :zipCode',
        ExpressionAttributeValues: {
          ':zipCode': zipCode
        }
      };
      const result = await dynamoDb.query(params).promise();
      console.log("results from db", result);
      let data = (result && result.Items) || [];

      if (result.LastEvaluatedKey) {
        params.ExclusiveStartKey = result.LastEvaluatedKey;
        data = data.concat(await queryWeather(zipCode));
      }
      return data;
  };

  return {
    getWeather,
    updateWeather,
    queryWeather
  };
};

module.exports = weatherService;
