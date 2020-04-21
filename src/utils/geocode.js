const request = require("request");
const chalk = require("chalk");

const geocode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=pk.eyJ1IjoibmF1dGljYTAwMDAiLCJhIjoiY2s5NGVibHF4MDBjeDNsbnhnOTRha28wMSJ9.gD2H0YK3ROydXXHWHJJFQA`;

  let error_msg, lat, long, place_name;

  //GETTING LAT LONG OF LOCATION
  request({ url }, (error, response) => {
    const data = JSON.parse(response.body);
    const err_msg = data.message;
    if (error || err_msg || data.features.length === 0) {
      error_msg = error || err_msg;
      error_msg = data.features.length === 0 ? "NO RESULTS" : error_msg;
    } else {
      const feature = data.features[0];
      [lat, long] = feature.center;
      place_name = feature.place_name;
    }
    callback(error_msg, { long, lat, place_name });
  });
};

module.exports = geocode;
