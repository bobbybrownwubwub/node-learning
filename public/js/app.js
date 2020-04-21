console.log("client side js file loaded");

const weather_form = document.querySelector("form");
const input = document.querySelector("input");

weather_form.addEventListener("submit", (e) => {
  document.querySelector("#msg1").textContent = "Loading...";

  e.preventDefault();
  let location = input.value;
  const url = `/weather?address=` + location;
  fetch(url).then((response) => {
    response.json().then((data) => {
      console.log(data);
      // if (data.message || data.features.length === 0) {
      //   error_msg = error || err_msg;
      //   error_msg = data.features.length === 0 ? "NO RESULTS" : error_msg;
      // } else {
      //   [lat, long] = data.features[0].center;
      // }
      document.querySelector("#msg1").textContent = data.place_name;
      document.querySelector("#msg2").textContent = `Is ${data.temperature} degrees F but feels like 
      ${data.feelslike} degrees`;
    });
  });
});
