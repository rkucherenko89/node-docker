const Post = require('../models/postModel')


const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).json({ status: 'success', nbHits: posts.length, result: posts })
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: 'fail' })
  }
}

const getOnePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json({ status: 'success', result: post })
  } catch (error) {
    res.status(400).json({ status: 'fail' })
  }
}

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body)
    res.status(200).json({ status: 'success', result: post })
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: 'fail' })
  }
}

const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({ status: 'success', result: post })
  } catch (error) {
    res.status(400).json({ status: 'fail' })
  }
}

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({ status: 'success' })
  } catch (error) {
    res.status(400).json({ status: 'fail' })
  }
}


module.exports = {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost
}
