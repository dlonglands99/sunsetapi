//SETUP
let express = require("express");
let request = require("request");
let bodyParser = require("body-parser");
let app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

let sunriseTime = "";
let sunsetTime = "";
let dayLength = "";

//GET REQUESTS
app.get("/", (req, res) => {
    res.render("home", {sunriseTime: sunriseTime,
                        sunsetTime: sunsetTime,
                        dayLength: dayLength});
});

//POST REQUEST TO GET API DATA
app.post("/getTimes", (req, res) => {
    //make a request with the user input for lat and long
    request("https://api.sunrise-sunset.org/json?lat=" + req.body.latitude + 
    "&lng=" + req.body.longitude, (error, respone, body) => {
        if(!error && respone.statusCode == 200) {
            let parsedBody = JSON.parse(body);
            sunriseTime = parsedBody["results"]["sunrise"];
            sunsetTime = parsedBody["results"]["sunset"];
            dayLength = parsedBody["results"]["day_length"];

            //small bug to fix here
            res.redirect("/");
        }
    });
    
});

//localhost:3000
app.listen(3000, () => {
    console.log("Server is running!");
});

