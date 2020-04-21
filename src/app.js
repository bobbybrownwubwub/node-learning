const path = require("path");
const express = require("express");
const chalk = require("chalk");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

//DEFINE PATHS FOR EXPRESS CONFIG
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//SET UP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", {
    header: "Weather",
    // address,
    // feelslike: feelslike,
  });
});

app.get("/weather", (req, res) => {
  let address = req.query.address;
  if (!address) return res.send({ error: "NEEDS ADDRESS BITCH!" });

  geocode(address, (error, { long, lat, place_name }) => {
    if (error) res.send("GEOCODE ISSUE BITCH!!");

    forecast(error, { long, lat, place_name }, (feelslike, place_name) => {
      console.log("[src app.js]", feelslike, place_name);
      res.send({
        feelslike,
        place_name,
        temperature
      });
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    img_src: "../public/assets/1468.jpg",
    header: "About",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    header: "help",
    msg:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", { msg: "Help article not found" });
});

app.get("*", (req, res) => {
  res.render("404", { msg: "404 NOT FOUND" });
});

app.listen(port, () =>
  console.log(chalk.green.inverse("server is up in " + port))
);
