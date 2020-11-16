var express = require("express");

var app = express();

var PORT = process.env.PORT || 8080;

//Here we are telling the host to use the Express framework.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Here we are directing the app to reference the public folder in order to format the page appropriately.
app.use(express.static('public'))

//This is establishing the proper routes for the app to reference. 
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//This initiates the server.
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
}); 