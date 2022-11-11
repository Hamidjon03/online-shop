const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const connectDB = require('./config/db')

// Env variables
dotenv.config()

// Connecting to database
connectDB()

// Initialize session
const store = new MongoStore({
  collection: 'session',
  uri: process.env.MONGO_URI,
})

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}))

// config static folder
app.use(express.static(path.join(__dirname, 'public')))

// config handlebars
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')


// Initialize routes
app.use('/', require('./routes/homeRoutes'))
app.use('/posters', require('./routes/postersRoutes'))
app.use('/auth', require('./routes/authRoutes'))


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server has been started on Port: ${PORT}`)
})