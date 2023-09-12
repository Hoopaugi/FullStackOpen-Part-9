import express from 'express';

import pingControllers from './ping.controllers';

const router = express.Router();

router.get('/ping', pingControllers.ping);

export default router;
