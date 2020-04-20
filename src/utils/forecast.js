const request = require("request");
const chalk = require("chalk");

const forecast = (geocode_error, latlong, callback) => {
  const weatherstack_url = `http://api.weatherstack.com/current?access_key=54939f827c0ef0c4f9f4661d18b11518&query=${latlong.toString()}&units=f`;

  request({ url: weatherstack_url, json: true }, (error, response) => {
    if (error || response.body.success === false || geocode_error) {
      console.log(
        geocode_error + ">>>" ||
          "" + chalk.magenta.inverse(error || response.body.error.info)
      );
    } else {
      const data = response.body;
      callback(data.current.feelslike);
    }
  });
};

module.exports = forecast;
