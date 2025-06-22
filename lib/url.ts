import mongoose, { Schema, models, model } from 'mongoose';

const UrlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  machineId: {
    type: String,
    required: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  visitCount: {
    type: Number,
    default: 0,
  },
  lastVisited: {
    type: Date,
  },
});

const Url = models.Url || model('Url', UrlSchema);

export default Url; 