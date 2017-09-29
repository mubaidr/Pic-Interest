const router = require('express').Router()
const Media = require('./../models').Media

router.get('/api/media/', (req, res, next) => {
  Media.find().sort({
    upload_date: -1
  }).populate('uploader').populate('votes').exec((err, media) => {
    if (err) next(err)

    res.json(media)
  })
})

router.get('/api/media/:id/', (req, res, next) => {
  let id = req.params.id

  Media.findById(id).populate('uploader').populate('votes').exec((err, media) => {
    if (err) next(err)

    res.json(media)
  })
})

router.post('/api/media/', (req, res, next) => {
  let media = new Media(req.body)
  media.upload_date = new Date()
  media.uploader = req.account.data._id

  media.save((err, savedMedia) => {
    if (err) next(err)

    res.json(savedMedia)
  })
})

router.delete('/api/media/:id/', (req, res, next) => {
  let id = req.params.id
  let uploaderId = req.account.data._id

  Media.findOneAndRemove({
    _id: id,
    uploader: uploaderId
  }).exec((err, deletedMedia) => {
    if (err) next(err)

    if (deletedMedia) {
      res.json(deletedMedia)
    } else {
      res.status(403).end()
    }
  })
})

module.exports = router
