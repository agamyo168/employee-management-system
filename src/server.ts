import express from 'express';
import sequelize from './configs/db-connection.config';
import logger from './helpers/logger';
import { StatusCodes } from 'http-status-codes';
import notFoundMiddleware from './middlewares/notfound.middleware';

const app = express();
const port = process.env.PORT || 3000;
//Security

//Health check
app.get('/api/v1/healthcheck', (req, res, next) => {
  res.status(StatusCodes.OK).json({ success: true, message: 'Health check!' });
});

// End of stack middlewares
//Not Found middleware
app.use(notFoundMiddleware);
// Error Handling middleware
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
