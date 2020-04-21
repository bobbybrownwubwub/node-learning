console.log("client side js file loaded");

const weather_form = document.querySelector("form");
const input = document.querySelector("input");

weather_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let value = input.value;
  console.log("test3");
  //const base = ""; //if 'http://localhost:3000'
  const url = `/weather?address=` + location;
  fetch(url).then((response) => {
    console.log(response);
    response.json().then((data) => {
      console.log(data);
      // if (data.message || data.features.length === 0) {
      //   error_msg = error || err_msg;
      //   error_msg = data.features.length === 0 ? "NO RESULTS" : error_msg;
      // } else {
      //   [lat, long] = data.features[0].center;
      // }
      document.querySelector("#msg1").textContent = "Looking for " + value;
      document.querySelector("#msg2").textContent = `Feels like 
      ${data.feelslike} degrees`;
    });
  });
});
