const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const methodOverride = require('method-override')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })



//connectDB()

const app = express()

// Body parser
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())

// Method override
// app.use(
//   methodOverride(function (req, res) {
//     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//       // look in urlencoded POST bodies and delete it
//       let method = req.body._method
//       delete req.body._method
//       return method
//     }
//   })
// )

// Logging
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }

// Handlebars Helpers
// const {
//   formatDate,
//   stripTags,
//   truncate,
//   editIcon,
//   select,
// } = require('./helpers/hbs')

// Handlebars
// app.engine(
//   '.hbs',
//   exphbs({
//     helpers: {
//       formatDate,
//       stripTags,
//       truncate,
//       editIcon,
//       select,
//     },
//     defaultLayout: 'main',
//     extname: '.hbs',
//   })
// )
// app.set('view engine', '.hbs')

// Sessions

// Passport middleware


// Set global var
// app.use(function (req, res, next) {
//   res.locals.user = req.user || null
//   next()
// })

// Static folder
// app.use(express.static(path.join(__dirname, 'public')))
// const { requireSignin, userMiddleware } = require("./middleware/auth");
// // Routes
// const indexRoutes=require("./routes/index")
app.get("/",(req,res)=>{
  res.sendFile("./index.html");
})
//app.use('/',)
//app.use('/auth', require('./routes/auth'))
//app.use('/stories', require('./routes/stories'))
 app.use('/customer', require('./routes/customer-route'))
// app.use('/dealer', require('./routes/dealer/dealer'))
// app.use('/labour', require('./routes/labour/labour'))

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
