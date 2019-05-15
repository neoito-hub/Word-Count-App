import express from 'express';
import { USER_ROUTES } from '../user/index.mjs';
import { FREQUENCY_ROUTES } from '../frequency/index.mjs';
const router = express.Router();

router.use('/user', ...USER_ROUTES);
router.use('/frequency', ...FREQUENCY_ROUTES);

export default router;
