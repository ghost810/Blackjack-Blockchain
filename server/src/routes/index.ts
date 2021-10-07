import { Router } from 'express'
import { getAmount, updateAmount } from '../controllers/todos'
 
const router: Router = Router()

router.get('/get-amount/:addr', getAmount);
router.put('/put-amount/:addr', updateAmount);

export default router
