var express = require("express");
var path = require("path");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cors = require("cors");
var app = express();

//Enable All CORS Requests
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(express.static(path.join(__dirname, "public")));

// error middleware
app.use(function (err, req, res, next) {

  console.log(err);

  res.status(err.status || 500);
  res.sendFile('error')
});


app.listen(process.env.PORT || 3000,()=>{
   console.log(`running in port ${process.env.PORT || 3000}`);
})
