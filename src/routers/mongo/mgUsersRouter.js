import { mongoUsers} from '../../daos/mongo/mongoUsers';
import EErros from '../../errors/enums';
import CustomError from "../../errors/custom-error";
import { Router } from "express";
import Router from Router.Router();

const Service = new mongoUsers();

Router.get('/', async (req, res) => {
  try {
    const users = await Service.getAll();
    console.log(users);
    return res.status(200).json({
      status: 'success',
      msg: 'listado de usuarios',
      data: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong',
      data: {},
    });
  }
});

Router.post('/', async (req, res) => {

    const { firstName, lastName, email } = req.body;
    const userCreated = await Service.createOne(firstName, lastName, email);
    if (userCreated) {
      CustomError.createError({
        name: "User creation error",
        message: "Error trying to create user",
        code: EErros.INVALID_USER_ERROR,
      });
    }
});

Router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      status: 'success',
      msg: 'user deleted',
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

Router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    return res.status(201).json({
      status: 'success',
      msg: 'user uptaded',
      data: { _id: id, firstName, lastName, email },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

export default Router;