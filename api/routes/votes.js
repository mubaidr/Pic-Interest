const router = require('express').Router()
const Votes = require('./../models').Votes

router.post('/api/vote/', (req, res, next) => {
  let mediaId = req.body.mediaId
  let userId = req.account.data._id

  Votes.findOne({
    media: mediaId,
    user: userId
  }).exec((err, vote) => {
    if (err) next(err)

    if (vote.user._id === userId) {
      Votes.findByIdAndRemove(vote._id).exec((err) => {
        if (err) next(err)

        res.json({
          voted: false,
          vote: vote
        })
      })
    } else {
      let vote = new Votes({
        media: mediaId,
        user: userId
      })

      vote.save((err, vote) => {
        if (err) next(err)

        res.json({
          voted: true,
          vote: vote
        })
      })
    }
  })
})

module.exports = router
