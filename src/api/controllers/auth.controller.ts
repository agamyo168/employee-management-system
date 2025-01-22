import { Request, Response, NextFunction } from 'express';
import { createUser } from '../../services/user.service';
import { StatusCodes } from 'http-status-codes';
import logger from '../../helpers/logger';
import ConflictError from '../../errors/custom/conflict.error.class';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  //Input is a validated username, password
  try {
    const { username, password } = req.body;
    const user = await createUser({ username, password });
    res.status(StatusCodes.OK).json({
      success: true,
      message: { id: user.id, username: user.username },
    });
  } catch (err) {
    logger.error(err);
    return next(new ConflictError('Username already exists!'));
  }
};

export { signup };
