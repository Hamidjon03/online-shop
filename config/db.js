const mongoose = require('mongoose')

const connectDB = async () => {
  const connecting = await mongoose.connect('mongodb://localhost:27017/olx', {
    useNewUrlParser: true,
  })
  console.log(`MongoDB connected to ${connecting.connection.host}`)
}

module.exports = connectDB