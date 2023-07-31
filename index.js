const express = require('express')
const app = express()
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, SESSION_SECRET } = require('./config/config')
const postRouter = require('./routes/postRoutes')
const authRouter = require('./routes/authRouter')
const connectDB = require('./db/connect')
const redisClient = require('./db/redis')
const session = require('express-session')
const RedisStore = require('connect-redis').default
const cors = require('cors')


app.set('trust proxy', 1)
app.use(cors())
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 3700 * 1000
  }
}))
app.use(express.json())

app.use('/api/v1/posts', postRouter)
app.use('/api/v1/auth', authRouter)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
    await redisClient.connect()
      .then(() => console.info('redis connected'))
      .catch(console.error)
    app.listen(port, () => {
      console.log(`App is started at ${port} port...`)
    })
  } catch (error) {
    console.log(error)
    setTimeout(start, 5000)
  }
}

start()
