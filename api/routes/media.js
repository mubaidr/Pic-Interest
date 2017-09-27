const router = require('express').Router()
const Media = require('./../models').Media

router.get('/api/media/', (req, res, next) => {
  Media.find().sort({
    upload_date: -1
  }).exec((err, media) => {
    if (err) next(err)

    res.json(media)
  })
})

router.get('/api/media/:id/', (req, res, next) => {
  let id = req.params.id

  Media.findById(id).populate('uploader').exec((err, media) => {
    if (err) next(err)

    res.json(media)
  })
})

router.post('/api/media/', (req, res, next) => {
  let media = new Media(req.body)
  media.upload_date = new Date()

  media.save((err, updatedMedia) => {
    if (err) next(err)

    res.json(updatedMedia)
  })
})

router.delete('/api/media/', (req, res, next) => {
  let id = req.body.id
  let uploaderId = req.account.data._id

  Media.findOneAndRemove({
    _id: id,
    uploader: uploaderId
  }).exec((err, deletedMedia) => {
    if (err) next(err)

    res.json(deletedMedia)
  })
})
