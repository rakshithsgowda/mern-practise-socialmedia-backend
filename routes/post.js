import express from 'express'
import formidable from 'express-formidable'

import { requireSignIn, canEditDeletePost } from '../middlewares/auth'
import {
  createPost,
  uploadImage,
  postsByUser,
  userPost,
  updatePost,
  deletePost,
} from '../controllers/post'

const router = express.Router()

router.post('/create-post', requireSignIn, createPost)
router.post(
  '/upload-image',
  requireSignIn,
  formidable({ maxFieldsSize: 5 * 1024 * 1024 }),
  uploadImage
)

// posts - since the user is already logged in
router.get('/user-posts', requireSignIn, postsByUser)
router.get('/user-post/:_id', requireSignIn, userPost)
router.put('/update-post/:_id', requireSignIn, canEditDeletePost, updatePost)
router.delete('/delete-post/:_id', requireSignIn, canEditDeletePost, deletePost)

module.exports = router
