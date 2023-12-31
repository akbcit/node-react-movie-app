const express = require("express");
const authRouter = express.Router();

const {RegisterUser,LoginUser,LogoutUser,CheckAuth} = require("../controllers/authController");

authRouter.post("/register",RegisterUser);

authRouter.post("/login",LoginUser);

authRouter.post("/logout",LogoutUser);

authRouter.get("/checkauth",CheckAuth);

authRouter.get('/testcookie', (req, res) => {
    console.log("hi");
    res.cookie('TestCookie', 'ThisIsATest', { httpOnly: true, sameSite: 'Lax' });
    res.send('Test cookie set');
  });

module.exports = authRouter;