/**
 * index
 * @author: oldj
 * @homepage: https://oldj.net
 */

import express from 'express'
import list from './list'
import toggle from './toggle'
import add from './add'

const router = express.Router()

router.get('/list', list)
router.get('/toggle', toggle)
router.post('/add', add);

export default router
