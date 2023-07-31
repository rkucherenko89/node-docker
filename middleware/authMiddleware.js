const protect = (req, res, next) => {
  const { user } = req.session
  if (!user) {
    return res.status(401).json({ status: 'fail', msg: 'unauthorized' })
  }
  req.user = user
  console.log(user)
  next()
}

module.exports = protect
