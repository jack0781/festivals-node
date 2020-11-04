import { responseHandler } from '../../config/ResponseHandler.js'
import { Festivals } from '../models/Festivals.js'
import _ from 'lodash'
import fs from 'fs'

export const create = async (req, res, next) => {
  try {
    if (req.file.filename) {
      req.body.image = req.file.filename
    }
    let post = new Festivals(req.body)
    post.save((err, post) => {
      if (err) {
        return res.send(responseHandler(null, true, err))
      }
      return res.send(responseHandler(post))
    })
  } catch (error) {
    next(error)
  }
}
