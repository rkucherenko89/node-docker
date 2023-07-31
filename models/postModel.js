const mongoose = require('mongoose')


const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title__required']
  },
  body: {
    type: String,
    required: [true, 'body__required']
  }
})

const Post = mongoose.model('Post', PostSchema)


module.exports = Post
