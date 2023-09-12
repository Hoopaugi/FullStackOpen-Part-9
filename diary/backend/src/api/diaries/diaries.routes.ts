import express from 'express';

import diariesControllers from './diaries.controllers';

const router = express.Router();

router.get('/', diariesControllers.getAllNonSensitive);

router.get('/:id', diariesControllers.getById);

router.post('/', diariesControllers.create);

export default router;
