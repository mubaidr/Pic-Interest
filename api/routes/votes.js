const router = require('express').Router()
const Votes = require('./../models').Votes

router.post('/api/vote/', (req, res, next) => {
  let mediaId = req.body.mediaId
  let userId = req.account.data._id

  Votes.findOneAndRemove({
    media: mediaId,
    user: userId
  }).exec((err, vote) => {
    if (err) next(err)

    if (vote) {
      res.json({
        voted: false,
        vote: vote
      })
    } else {
      new Votes({
        media: mediaId,
        user: userId
      }).save((err, vote) => {
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
