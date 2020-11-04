import express from 'express'
import Multer from 'multer'
import { create } from '../api/controllers/FestivalsController.js'

const router = express.Router()

const storage = Multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'src/uploads/')
  },
  filename: function (req, file, callback) {
    let re = /(?:\.([^.]+))?$/
    callback(
      null,
      Math.floor(Math.random() * 10000 + 1).toString() +
        Date.now() +
        '.' +
        re.exec(file.originalname)[1]
    )
  },
})

const upload = Multer({
  storage: storage,
}).single('image')

router.post('/create', upload, create)

export default router
