import mongoose, { Schema } from 'mongoose'

const clubSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  coordinator: { type: mongoose.Types.ObjectId },
  events: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Event'
    }
  ],
  email: { type: String, required: true },
  members: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  ],
  creationDate: { type: Date }
})

const Club = mongoose.model('Club', clubSchema)

export default Club