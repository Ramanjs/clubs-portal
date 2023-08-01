import mongoose, { Schema } from 'mongoose'

const eventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  domain: { type: String },
  start: { type: Date },
  end: { type: Date },
  venue: { type: String },
  coordinator: { type: mongoose.Types.ObjectId, ref: 'User' },
  status: { type: String },
  registrationDeadline: { type: String },
  club: { type: mongoose.Types.ObjectId, ref: 'Club' },
  participants: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  ],
  creationDate: { type: String }
})

const Event = mongoose.model('Event', eventSchema)

export default Event
