const config = require("config");
const mongoose = require("mongoose");
const usersRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route")
const express = require("express");
const app = express();


//use config module to get the privatekey, if no private key set, end the application
if (!config.get("secretkey")) {
  console.error("FATAL ERROR: secretkey is not defined.");
  process.exit(1);
}

//connect to mongodb
mongoose
  .connect("mongodb://localhost/pos-sys-d", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));


app.use(express.json());

// routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
