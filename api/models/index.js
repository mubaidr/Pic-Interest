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
  last_name: String,
  contact_number: String,
  state: String,
  city: String
})

let userModel = mongoose.model('User', userSchema)

// voteSchema.pre('save', next => {
//   next()
// })

module.exports = {
  Users: userModel
}
