import { isAdmin, isUser } from '../../middleware/auth';
import passport from 'passport';
import { Router } from "express";
import Router from Router.Router();
 



Router.get('/session', (req, res) => {
  return res.send(JSON.stringify(req.session));
});

Router.get('/login', (req, res) => {
  return res.render('login', {});
});

Router.post('/login', passport.authenticate("login",{succesRedirect: "/home", failureRedirect: "/error",failureFlash: true}));


Router.get('/register', (req, res) => {
  return res.render('register', {});
});

Router.post('/register', passport.authenticate("register",{succesRedirect: "/auth/login", failureRedirect: "/error", failureFlash: true}));
 

Router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).render('error', { error: 'No se pudo cerrar su session' });
    }
     return res.redirect('/auth/login');
  });
});
 
Router.get("/github", passport.authenticate("github", { scope: ["user:email"] })
);

Router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/error",}), (req, res) => {
    res.redirect("/home");
  }
);

Router.get('/perfil', isUser, (req, res) => {
  const user = { email: req.session.email, isAdmin: req.session.isAdmin };
  return res.render('perfil', { user: user });
});

Router.get('/administracion', isUser, isAdmin, (req, res) => {
  return res.send('Datos secretos');
});
export default Router;