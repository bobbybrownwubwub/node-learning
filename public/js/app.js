console.log("client side js file loaded");

const weather_form = document.querySelector("form");
const input = document.querySelector("input");

weather_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = input.value;
  console.log("test3");
  //const base = ""; //if 'http://localhost:3000'
  const url = `/weather?address=` + location;
  console.log('location',location);
  fetch(url).then((response) => {
    
    response.json().then((data) => {
      console.log(data);
      // if (data.message || data.features.length === 0) {
      //   error_msg = error || err_msg;
      //   error_msg = data.features.length === 0 ? "NO RESULTS" : error_msg;
      // } else {
      //   [lat, long] = data.features[0].center;
      // }
      document.querySelector("#msg1").textContent = "Looking for " + location;
      document.querySelector("#msg2").textContent = `Feels like 
      ${data.feelslike} degrees`;
    });
  });
});
