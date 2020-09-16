const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const usersRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route")
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

const clientPort = process.env.CLIENT_PORT || 3000;
app.use(cors({ origin: `http://localhost:${clientPort}` }))
app.use(express.json());

// routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
