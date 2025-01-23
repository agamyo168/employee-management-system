import express from 'express';

const router = express.Router();

router.route('/dashboard').get();

export default router;
