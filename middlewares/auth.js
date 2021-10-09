import expressJwt from 'express-jwt'
import Post from '../models/post'

export const requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
})

export const canEditDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id)
    // console.log('post in EDit DElte Middleware =>', post)
    if (req.user._id != post.postedBy) {
      return res.status(400).send('Unauthorized')
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
  }
}
