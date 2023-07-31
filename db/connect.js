const mongoose = require('mongoose')

const connectDB = async (url) => {
  try {
    await mongoose.connect(url)
    console.log('mongo connected')
  } catch (error) {
    throw error
  }
}

module.exports = connectDB
