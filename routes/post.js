import express from 'express'
import formidable from 'express-formidable'

import { requireSignIn } from '../middlewares/auth'
import { createPost, uploadImage } from '../controllers/post'

const router = express.Router()

router.post('/create-post', requireSignIn, createPost)
router.post(
  '/upload-image',
  requireSignIn,
  formidable({ maxFieldsSize: 5 * 1024 * 1024 }),
  uploadImage
)

module.exports = router
