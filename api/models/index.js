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
  link: {
    type: String,
    required: true
  },
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    model: 'Vote'
  }],
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    model: 'User'
  },
  upload_date: Date
})

let voteSchema = new mongoose.Schema({
  media: {
    type: mongoose.Schema.Types.ObjectId,
    model: 'Media'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    model: 'User'
  }
})

let userModel = mongoose.model('User', userSchema)
let mediaModel = mongoose.model('Meida', mediaSchema)
let voteModel = mongoose.model('Vote', voteSchema)

// voteSchema.pre('save', next => {
//   next()
// })

module.exports = {
  Users: userModel,
  Media: mediaModel,
  Votes: voteModel
}
