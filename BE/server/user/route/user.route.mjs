import express from 'express';
import userCtrl from '../controller/user.controller.mjs';
const router = express.Router();

router.route('/').get(userCtrl.giveFrequencyData);
router.route('/').post(userCtrl.addUser);
export default router;
