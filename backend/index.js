const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const csurf = require("csurf");
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

const port = process.env.PORT || 3001;
app.use(cors({ origin: `http://localhost:${port}` }))
app.use(express.json());
app.use(cookieParser());
// CSRF protection
const csrfProtection = csurf({
  cookie: true
});
app.use(csrfProtection);
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => console.log(`Listening on port ${port}...`));
