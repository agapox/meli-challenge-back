
import { Router } from 'express';

import * as itemsController from '../controllers/items.controller';

const router = Router();


router.get('/search', itemsController.searchItems );

router.get('/:id', itemsController.getItem );


export default router;