const User = require('../models/userModel')
const bcrypt = require('bcryptjs')


const signUp = async (req, res) => {
  const { username, password } = req.body
  try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({ username, password: hashedPassword })
    req.session.user = user
    res.status(201).json({ status: 'success', data: { user } })
  } catch (error) {
    res.status(400).json({ status: 'fail' })
  }
}

const signIn = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).json({ status: 'fail', msg: 'user not found' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    req.session.user = user
    if (isPasswordValid) {
      res.status(200).json({ status: 'success', user })
    } else {
      res.status(404).json({ status: 'fail', msg: 'username or password are incorrect' })
    }
  } catch (error) {
    res.status(404).json({ status: 'fail' })
  }
}


module.exports = {
  signUp,
  signIn
}
