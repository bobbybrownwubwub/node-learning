const request = require("request");
const chalk = require("chalk");

const forecast = (geocode_error, {long, lat, place_name}, callback) => {
  console.log('lat+""+long',lat+","+long)
  const weatherstack_url = `http://api.weatherstack.com/current?access_key=54939f827c0ef0c4f9f4661d18b11518&query=${long+","+lat}&units=f`;

  request({ url: weatherstack_url, json: true }, (error, response) => {
    if (error || response.body.success === false || geocode_error) {
      console.log(
        geocode_error + ">>>" ||
          "" + chalk.magenta.inverse(error || response.body.error.info)
      );
    } else {
      const data = response.body;

      console.log(chalk.red.inverse("--------------------"));
      console.log(JSON.stringify(data));

      callback(data.current.feelslike,place_name,data.current.temperature);
    }
  });
};

module.exports = forecast;
