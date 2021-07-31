/** importing dependencies */
import express from 'express'
/** importing controllers */
import {home, dashboard, error} from '../controllers/page.controller.js'
import {Authenticate} from '../middlewares/Authenticate.js'

const router = express.Router()

//GET HTTP
router.get('/', home)
router.get('/index', home)
router.get('/error', error)
router.get('/dashboard', Authenticate, dashboard)

//POST HTTP

export default router