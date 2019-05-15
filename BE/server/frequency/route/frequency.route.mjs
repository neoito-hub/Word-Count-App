import express from 'express';
import freqCtrl from '../controller/frequency.controller';
const router = express.Router();

router.route('/').post(freqCtrl.addFrequencyData);

export default router;
