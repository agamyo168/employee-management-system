import express from 'express';
import { StatusCodes } from 'http-status-codes';
import notFoundMiddleware from './middlewares/notfound.middleware';
import sequelize from './configs/db-connection.config';
import logger from './helpers/logger';
import routes from './api/routes/api/v1/';
import errorHandlerMiddleware from './middlewares/error-handler.middleware';
import helmet from 'helmet';
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
//Security
app.use(express.json({ limit: '50kb' }));
app.use(helmet());
//Health check
app.get('/api/v1/healthcheck', (req, res, next) => {
  res.status(StatusCodes.OK).json({ success: true, message: 'Health check!' });
});
//All Routes
app.use('/api/v1/', routes);

// End of express middlewares stack

//Not Found middleware
app.use(notFoundMiddleware);
// Error Handling middleware
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await sequelize.sync(/*{ force: true }*/);
    logger.info('DB Connected');
    app.listen(port, () => {
      logger.info(`Server is listening on http://localhost:${port}`);
    });
  } catch (err) {
    logger.error(err);
  }
};
start();
export default app;
