import express from 'express'
import {
  currentUser,
  forgotPassword,
  login,
  register,
  profileUpdate,
  findPeople,
} from '../controllers/auth'
import { requireSignIn } from '../middlewares/auth'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/current-user', requireSignIn, currentUser)
router.post('/forgot-password', forgotPassword)
router.put('/profile-update', requireSignIn, profileUpdate)
router.get('/find-people', requireSignIn, findPeople)

module.exports = router
