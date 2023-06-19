import { usersModels } from '../../daos/mongo/models/usersModels';
import { isAdmin, isUser } from '../../middleware/auth';
import { Router } from "express";
import Router from Router.Router();

Router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).render('error', { error: 'No se pudo cerrar su session' });
    }
     return res.redirect('/auth/login');
  });
});

Router.get('/perfil', isUser, (req, res) => {
  const user = { email: req.session.email, isAdmin: req.session.isAdmin };
  return res.render('perfil', { user: user });
});

Router.get('/administracion', isUser, isAdmin, (req, res) => {
  return res.send('Datos secretos');
});

Router.get('/login', (req, res) => {
  return res.render('login', {});
});

Router.post('/login', async (req, res) => {
  const { email, pass } = req.body;
  if (!email || !pass) {
    return res.status(400).render('error', { error: 'Ingrese su Email y password'});
  }
  const usarioEncontrado = await usersModels.findOne({ email: email });
  if (usarioEncontrado && usarioEncontrado.pass == pass) {
    req.session.email = usarioEncontrado.email;
    req.session.isAdmin = usarioEncontrado.isAdmin;

    return res.redirect('/auth/perfil');
  } else {
    return res.status(401).render('error', { error: 'Email o password incorrecto'});
  }
});

Router.get('/register', (req, res) => {
  return res.render('register', {});
});

Router.post('/register', async (req, res) => {
  const { email, pass, firstName, lastName } = req.body;
  if (!email || !pass || !firstName || !lastName) {
    return res.status(400).render('error', { error: 'Datos incorrectos' });
  }
  try {
    await usersModels.create({ email: email, pass: pass, firstName: firstName, lastName: lastName, isAdmin: false });
    req.session.email = email;
    req.session.isAdmin = false;

    return res.redirect('/auth/perfil');
  } catch (e) {
    console.log(e);
    return res.status(400).render('error', { error: 'No se pudo crear el usuario. Intente con otro email.' });
  }
});
export default Router;