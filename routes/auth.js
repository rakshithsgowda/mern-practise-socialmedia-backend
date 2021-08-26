import express from 'express'
import { currentUser, login, register } from '../controllers/auth'
import { requireSignIn } from '../middlewares/auth'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/current-user', requireSignIn, currentUser)

module.exports = router
