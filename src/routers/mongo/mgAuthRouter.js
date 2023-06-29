import { usersModels } from '../../daos/mongo/models/usersModels';
import { isAdmin, isUser } from '../../middleware/auth';
import passport from 'passport';
import { Router } from "express";
import Router from Router.Router();
import { createHash, isValidPassword } from '../../utils/bcrytp';



Router.get('/session', (req, res) => {
  return res.send(JSON.stringify(req.session));
});

Router.get('/login', (req, res) => {
  return res.render('login', {});
});

Router.post('/login', passport.authenticate("login",{succesRedirect: "/home", failureRedirect: "/error",failureFlash: true}), async (req, res) => {

  const { email, pass } = req.body;
  if (!email || !pass) {
    return res.status(400).render('error', { error: 'Ingrese su Email y password'});
  }
  const usuarioEncontrado = await usersModels.findOne({ email: email });
  if (usuarioEncontrado &&  isValidPassword(pass, usuarioEncontrado.pass)) {
    req.session.email = usuarioEncontrado.email;
    req.session.isAdmin = usuarioEncontrado.isAdmin;

    return res.redirect('/auth/perfil');
  } else {
    return res.status(401).render('error', { error: 'Email o password incorrecto'});
  }
 
});


Router.get('/register', (req, res) => {
  return res.render('register', {});
});

Router.post('/register', passport.authenticate("register",{succesRedirect: "/auth/login", failureRedirect: "/error", failureFlash: true}), async (req, res) => {
  const { email, pass, firstName, lastName } = req.body;
  if (!email || !pass || !firstName || !lastName) {
    return res.status(400).render('error', { error: 'Datos incorrectos' });
  }
  try {
    await usersModels.create({ email: email, pass: createHash (pass), firstName: firstName, lastName: lastName, isAdmin: false });
    req.session.email = email;
    req.session.isAdmin = false;

    return res.redirect('/auth/perfil');
  } catch (e) {
    console.log(e);
    return res.status(400).render('error', { error: 'No se pudo crear el usuario. Intente con otro email.' });
  }
});

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