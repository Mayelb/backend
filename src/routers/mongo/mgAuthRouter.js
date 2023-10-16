import { isAdmin, isUser } from '../../middleware/auth';
import { viewLogin,viewRegister, getCurrentUser,logout, redirectToHome } from '../../controllers/authController';
import passport from 'passport';
import { Router } from "express";
import Router from Router.Router();
 



Router.get('/login', viewLogin);

Router.get("/register", viewRegister);

Router.post('/register', passport.authenticate("register",{succesRedirect: "auth/login", failureRedirect: "/error",failureFlash: true}));


Router.get('/register', (req, res) => {
  return res.render('register', {});
});

Router.post('/login', passport.authenticate("login",{succesRedirect: "/home", failureRedirect: "/error", failureFlash: true}));
 
Router.get("/current", getCurrentUser);

Router.get('/logout', logout);
 
Router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

Router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/error",}), redirectToHome );

Router.get('/perfil', isUser, (req, res) => {
  const user = { email: req.session.email, isAdmin: req.session.isAdmin };
  return res.render('perfil', { user: user });
});

Router.get('/administracion', isUser, isAdmin, (req, res) => {
  return res.send('Datos secretos');
});
export default Router;