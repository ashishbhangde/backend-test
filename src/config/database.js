import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const host = 'localhost'
const port = process.env.MONGODB_PORT || 27017
const db = process.env.MONGODB_DB || 'studentdb'

// Construct the URI from different parts
const mongodb_uri = 'mongodb://' + host + ':' + port + '/' + db

mongoose.connect(mongodb_uri,{ useUnifiedTopology: true, useNewUrlParser: true }, error => {
  if (error) {
    // eslint-disable-next-line no-console
    console.error(`🐞 🐛 Failed to connect to mongodb\n\n\n${error} 🐛 🐞`)
    process.exit(1)
  }
  // eslint-disable-next-line no-console
  console.log(`🙌 💾 ${mongodb_uri} connected successfully 💽 🙌`)
})

export default mongoose