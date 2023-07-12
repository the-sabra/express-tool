const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const cors = require("cors");
const app = express();

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
