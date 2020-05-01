const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const { User } = require("./models/user");
const { auth } = require("./middlewares/auth");

const config = require("./config/key");
const port = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // This one to use findOneAndModify
  })
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((err) => {
    console.log("Error While connecting to DB: ", err);
  });

app.listen(port, () => {
  console.log("Server at => http://localhost:" + port);
});

app.get("/", (req, res) => {
  res.send("Yay! You got it working!");
});

// Auth Middleware
app.get("/api/user/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});

// Login the User
app.post("/api/users/login", (req, res) => {
  // find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found!",
      });
    }

    // Compare password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginsuccess: false, message: "Wrong Password!" });
      }

      if (err) {
        return res.json({ loginsuccess: false, err });
      }
    });

    // Generate token
    user.generateToken((err, user) => {
      if (err) {
        return res.status(400).send(err);
      }

      res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true });
    });
  });
});

// Register the user
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userData) => {
    if (err) return res.json({ success: false, err });

    return res.status(200).json({
      success: true,
      userData,
    });
  });
});

// Logout user
app.get("/api/user/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });

    return res.status(200).send({
      success: true,
    });
  });
});
