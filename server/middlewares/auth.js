const { User } = require("../models/user");

const auth = (req, res, next) => {
  let token = req.cookies.x_auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: "Probably, User not logged in or Doesn't exist!",
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
