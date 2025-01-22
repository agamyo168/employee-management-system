import express from 'express';
import sequelize from './configs/db-connection.config';
import logger from './helpers/logger';
import { StatusCodes } from 'http-status-codes';
import Departments from './models/departments.model';
import Employees from './models/employees.model';

const app = express();
const port = process.env.PORT || 3000;
//Security

//Health check
app.get('/api/v1/healthcheck', (req, res, next) => {
  res.status(StatusCodes.OK).json({ success: true, message: 'Health check!' });
});

const start = async () => {
  try {
    await sequelize.sync(/*{ force: true }*/);

    app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  } catch (err) {
    logger.error(err);
  }
};
start();

export default app;
