import Post from '../models/post'
import cloudinary from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

export const createPost = async (req, res) => {
  // console.log('post => ', req.body)
  const { content, image } = req.body
  if (!content.length) {
    return res.json({
      error: 'content is required',
    })
  }
  try {
    const post = new Post({ content, image, postedBy: req.user._id })
    // console.log(`post from try=>`, post)
    post.save()
    res.json(post)
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

export const uploadImage = async (req, res) => {
  // console.log('req files => ', req.files)
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path)
    // console.log('uploaded image url =>', result)
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    })
  } catch (error) {
    console.log(error)
  }
}
