const User = require("../models/User");
const verifyAuth = require("../utils/verifyAuth");
const passport = require("passport");
const validatePassword = require("../utils/validatePassword.js");
const UserRepo = require("../repos/UserRepo");

const _userRepo = new UserRepo();

exports.RegisterUser = async (req, res, next) => {
  // check auth status
  let authInfo = verifyAuth(req);
  if (authInfo.authenticated) {
    return res.send({
      message: "Prompt: user is already logged in",
      authInfo: authInfo,
    });
  } else {
    // check if response contains minimum info
    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.name ||
      !req.body.password
    ) {
      return res.send({
        message: "Error: incomplete information provided",
        authInfo: authInfo,
      });
    }
    // get user
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
    };
    const password = req.body.password;
    // validate password
    const validatePasswordResponse = validatePassword(password);
    if (!validatePasswordResponse.valid) {
      return res.send({
        message: `Error: ${validatePasswordResponse.error}`,
        authInfo: authInfo,
      });
    }
    // register user
    try {
      await User.register(new User(newUser), password);
    } catch (err) {
      console.log(err);
      return res.send({
        message: "Could not register",
        authInfo: authInfo,
        newUser: newUser,
      });
    }
    // After successfully registering the user...
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.send({
          message: "Authentication error",
          authInfo: authInfo,
          newUser: newUser,
        });
      }
      if (!user) {
        console.log(info);
        return res.send({
          message: "Authentication failed",
          authInfo: authInfo,
          newUser: newUser,
        });
      }
      req.login(user, async (loginErr) => {
        if (loginErr) {
          return res.send({
            message: "Login failed",
            authInfo: authInfo,
            newUser: newUser,
          });
        }
        req.session.roles = await _userRepo.getUserDetails(user.username, [
          "roles",
        ]).roles;
        authInfo = verifyAuth(req);
        return res.send({
          message: "Success: registered and logged in",
          authInfo: authInfo,
          newUser: newUser,
        });
      });
    })(req, res, next);
  }
};

exports.LoginUser = async (req, res, next) => {
  // check authInfo
  let authInfo = verifyAuth(req);
  if (authInfo.authenticated) {
    return res.send({
      message: "Logout before logging in",
      authInfo: authInfo,
    });
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.send({
        message: "Auth error",
        authInfo: authInfo,
      });
    }
    if (!user) {
      return res.send({
        message: "Auth failed",
        authInfo: authInfo,
      });
    }
    req.login(user, async (err) => {
      if (err) {
        return res.send({
          message: "Login error",
          authInfo: authInfo,
        });
      }
      req.session.roles = await _userRepo.getUserDetails(user.username, [
        "roles",
      ]).roles;
      authInfo = verifyAuth(req);
      return res.send({
        message: "Login successfull",
        authInfo: authInfo,
      });
    });
  })(req, res, next);
};

exports.LogoutUser = async (req, res, next) => {
  // check authInfo
  let authInfo = verifyAuth(req);
  if (!authInfo.authenticated) {
    return res.send({
      message: "Not logged in!",
      authInfo: authInfo,
    });
  }
  req.logout((err) => {
    if (err) {
      return res.send({
        message: "Logout error",
        authInfo: authInfo,
      });
    }
    authInfo = verifyAuth(req);
    return res.send({
      message: "Logout success",
      authInfo: authInfo,
    });
  });
};

exports.CheckAuth = async (req, res, next) => {
  // check authInfo
  let authInfo = verifyAuth(req);
  console.log(`authinfo:${authInfo.authenticated}`);
  return res.send({
    message: "Authinfo response",
    authInfo: authInfo,
  });
};
