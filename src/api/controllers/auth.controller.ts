import { Request, Response, NextFunction } from 'express';
import { authenticate, createUser } from '../../services/user.service';
import { StatusCodes } from 'http-status-codes';
import logger from '../../helpers/logger';
import ConflictError from '../../errors/custom/conflict.error.class';
import BadRequestError from '../../errors/custom/bad.request.error.class';
import UnauthorizedError from '../../errors/custom/unauthorized.error.class';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  //Input is a validated username, password
  try {
    const { username, password } = req.body;
    const user = await createUser({ username, password });
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: { id: user.id, username: user.username },
    });
  } catch (err) {
    logger.error(err);
    return next(new ConflictError('Username already exists!'));
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  //Get username and password --> Validated with JOI
  const { username, password } = req.body;
  //Authenticate username and password
  try {
    const token = await authenticate({ username, password });
    //return token
    res.status(StatusCodes.OK).json({
      success: true,
      token,
    });
  } catch (err) {
    //Throw Error if wrong username or password
    return next(new UnauthorizedError('invalid username or password'));
  }
};

export { signup, login };
