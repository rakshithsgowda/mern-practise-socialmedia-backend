import express from 'express'
import {
  currentUser,
  forgotPassword,
  login,
  register,
} from '../controllers/auth'
import { requireSignIn } from '../middlewares/auth'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/current-user', requireSignIn, currentUser)
router.post('/forgot-password', forgotPassword)

module.exports = router
