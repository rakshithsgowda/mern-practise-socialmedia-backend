import User from '../models/user'
import { hashPassword, comparePassword } from '../helpers/auth'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'

// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------

export const register = async (req, res) => {
  // console.log('REGISTER ENDPOINT => ', req.body)
  const { name, email, password, secret } = req.body
  // validation
  if (!name) {
    return res.json({
      error: 'Name is required',
    })
  }
  if (!password || password.length < 6) {
    return res.json({
      error: 'Password is required and should be 6 characters long',
    })
  }
  if (!secret) {
    return res.json({
      error: 'answer for secret is required',
    })
  }
  const exist = await User.findOne({ email })
  if (exist) {
    return res.json({
      error: 'Email is taken',
    })
  }
  // hash password
  const hashedPassword = await hashPassword(password)

  const user = new User({
    name,
    email,
    password: hashedPassword,
    secret,
    username: nanoid(6),
  })
  try {
    await user.save()
    // console.log(`REGISTERED USER => ${user}`)
    return res.json({
      ok: true,
    })
  } catch (err) {
    // console.log('REGISTERATION FAILED => ', err)
    return res.status(400).send('Error. Try Again.')
  }
}
// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------

export const login = async (req, res) => {
  // console.log(req.body)
  try {
    const { email, password } = req.body
    // check if our db has user with that email
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({
        error: 'no user found',
      })
    }
    // check password if user is found
    const match = await comparePassword(password, user.password)
    if (!match) {
      return res.json({
        error: 'wrong password',
      })
    }
    // create signed token if everything matches
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
    // setting passwords and secret undefined
    user.password = undefined
    user.secret = undefined
    res.json({
      token,
      user,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).send(`Error. try again.`)
  }
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------
export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    // res.json(user)
    res.json({ ok: true })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}
// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------

export const forgotPassword = async (req, res) => {
  // console.log(req.body)
  const { email, newPassword, secret } = req.body
  // validation
  if (!newPassword || newPassword.length < 6) {
    return res.json({
      error: 'new password is required and should be min of 6 characters long',
    })
  }
  if (!secret) {
    return res.json({
      error: 'secret is required',
    })
  }
  const user = await User.findOne({ email, secret })
  if (!user) {
    return res.json({
      error: "Sorry! Can't verify user with the given details",
    })
  }
  try {
    const hashed = await hashPassword(newPassword)
    await user.findByIdAndUpdate(user._id, { password: hashed })
    return res.json({
      success: 'Congrats, Now you can login with your new password',
    })
  } catch (error) {
    console.log(error)
    return res.json({
      error: 'Something wrong, Try again',
    })
  }
}

// ---------------------------------------------------------------------------------------------
// PRofile update
// ---------------------------------------------------------------------------------------------
export const profileUpdate = async (req, res) => {
  try {
    // console.log('profile update req.body', req?.body)
    const data = {}
    if (req.body.username) {
      data.username = req.body.username
    }
    if (req.body.about) {
      data.about = req.body.about
    }
    if (req.body.name) {
      data.name = req.body.name
    }
    if (req.body.password) {
      if (req.body.password < 6) {
        return res.json({
          error: 'Password required and should be min 6 characters long',
        })
      } else {
        data.password = await hashPassword(req.body.password)
      }
    }
    if (req.body.secret) {
      data.secret = req.body.secret
    }
    if (req.body.image) {
      data.image = req.body.image
    }

    let user = await User.findByIdAndUpdate(req.user._id, data, { new: true })
    // console.log('updated user info =>',user)
    user.password = undefined
    user.secret = undefined
    res.json(user)
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ error: 'Duplicate username' })
    }
    console.log(error)
  }
}

// ---------------------------------------------------------------------------------------------
// find people
// ---------------------------------------------------------------------------------------------
export const findPeople = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    // user.following
    let following = user.following
    following.push(user._id)
    const people = await User.find({ _id: { $nin: following } }).limit(10)
    res.json(people)
  } catch (error) {
    console.log(error)
  }
}

// ---------------------------------------------------------------------------------------------
