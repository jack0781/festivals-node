import Mongoose from 'mongoose'
const Schema = Mongoose.Schema

const FestivalsSchema = new Schema(
  {
    title: String,
    image: String,
    country: String,
    description: String,
    date: { type: Date, default: Date.now() },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

export const Festivals = Mongoose.model('Festivals', FestivalsSchema)
