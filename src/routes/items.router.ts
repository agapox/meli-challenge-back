
import { Router } from 'express';

import * as itemsController from '../controllers/items.controller';

const router = Router();

router.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Allow', 'GET');
    next();
});



router.get(
    '/search',
    itemsController.searchItems
);

router.get(
    '/:id',
    itemsController.getItem
);


export default router;