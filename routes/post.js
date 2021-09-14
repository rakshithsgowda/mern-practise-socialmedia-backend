import express from 'express'

import { requireSignIn } from '../middlewares/auth'
import { createPost } from '../controllers/post'
const router = express.Router()

router.post('/create-post', requireSignIn, createPost)

module.exports = router
