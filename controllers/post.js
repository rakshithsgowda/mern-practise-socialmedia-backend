import Post from '../models/post'

export const createPost = async (req, res) => {
  // console.log('post => ', req.body)
  const { content } = req.body
  if (!content.length) {
    return res.json({
      error: 'content is required',
    })
  }
  try {
    const post = new Post({ content, postedBy: req.user._id })
    // console.log(`post from try=>`, post)
    post.save()
    res.json(post)
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}
