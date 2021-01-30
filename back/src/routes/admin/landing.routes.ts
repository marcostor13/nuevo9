import { Router } from "express"
import { save, get, getByID, update, del } from './../../controllers/admin/landing.controller';

const router = Router()

router.post('/save-landing', save)
router.get('/get-landings', get)
router.get('/get-landing-by-id/:id', getByID)
router.patch('/update-landing/:id', update)
router.delete('/delete-landing/:id', del)


export default router