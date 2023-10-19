var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var mongoose = require("mongoose");
var cors = require("cors");

var indexRouter = require("./routes/index.routes");
var usersRouter = require("./routes/users.routes");
var authRotuer = require("./routes/auth.routes");
var layoutRouter = require("./routes/layout.routes");
var venueRouter = require("./routes/venue.routes");
var eventRouter = require("./routes/event.routes");
var ticketRouter = require("./routes/ticket.routes");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", 1);
app.enable("trust proxy");

app.use(
  cors({
    origin: [process.env.REACT_APP_URI], // <== URL of our future React app
  })
);

// app.use(
//     cors()
//   );
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRotuer);
app.use("/layout", layoutRouter);
app.use("/venue", venueRouter);
app.use("/event", eventRouter);
app.use("/ticket", ticketRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
module.exports = app;
