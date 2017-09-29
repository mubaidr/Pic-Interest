const router = require('express').Router()
const Votes = require('./../models').Votes
const Media = require('./../models').Media

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
      Media.findById(mediaId).populate('votes').exec((err, media) => {
        if (err) next(err)

        let vote = new Votes({
          media: mediaId,
          user: userId
        })

        vote.save((err, vote) => {
          if (err) next(err)

          media.votes.push(vote)

          media.save(err => {
            if (err) next(err)

            res.json({
              voted: true,
              vote: vote
            })
          })
        })

      })
    }
  })
})

module.exports = router
