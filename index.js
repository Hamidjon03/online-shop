const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const app = express()

// Env variables
dotenv.config()

// config static folder
app.use(express.static(path.join(__dirname, 'public')))

// config handlebars
app.engine('.hbs', exphbs.engine({extname: '.hbs'}))
app.set('view engine', '.hbs')


// Initialize routes
app.use('/', require('./routes/homeRoutes'))
app.use('/posters', require('./routes/postersRoutes'))


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server has been started on Port: ${PORT}`)
})