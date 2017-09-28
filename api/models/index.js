const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  username: {
    index: {
      unique: true
    },
    type: String,
    min: 6,
    max: 12,
    required: true
  },
  password: {
    type: String,
    min: 8,
    required: true,
    select: false
  },
  first_name: String,
  last_name: String
})

let mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vote'
  }],
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  upload_date: Date
})

let voteSchema = new mongoose.Schema({
  media: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

let userModel = mongoose.model('User', userSchema)
let mediaModel = mongoose.model('Media', mediaSchema)
let voteModel = mongoose.model('Vote', voteSchema)

// voteSchema.pre('save', next => {
//   next()
// })

module.exports = {
  Users: userModel,
  Media: mediaModel,
  Votes: voteModel
}
