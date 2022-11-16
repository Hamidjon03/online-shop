const {model, Schema} = require('mongoose')

const posterSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    min: 10
  },
  isActive: {
    type: Boolean,
    default: true
  },
  visits: {
    type: Number,
    default: 1
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true
})

module.exports = model("Poster", posterSchema)