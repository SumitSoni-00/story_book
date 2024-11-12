// ======authorization====== MIDDLEWARE

// const jwt = require('../helpers/jwt')
// const User = require('../models/user')

// module.exports = {
//   authentication: function(req, res, next) {
//     try {
//       const user = jwt.verifyToken(req.headers.token, process.env.JWT_KEY)
//       User.findOne({ email: user.email }).then(result => {
//         if (result) {
//           req.body.user = result
//           req.params.user = result
//           next()
//         } else {
//           throw new Error('User not found')
//         }
//       })
//     } catch (error) {
//       console.log('langsung dia masuk sini')

//       next(error)
//     }
//   },

//   adminOnly: function(req, res, next) {
//     let loginUser = req.body.user
//     if (loginUser && loginUser.role === 'admin') {
//       next()
//     } else {
//       next(new Error('Not Authorized'))
//     }
//   }
// }

// ====error handler==== MIDDLEWARE
// const errorHelper = require('../helpers/errorHandling')

// module.exports = function(err, req, res, next) {
//   //   console.log(err)
//   let errorToSend = errorHelper(err)
//   // console.log(errorToSend)
//   res.status(errorToSend.statusCode).json(errorToSend)
// }


// ====error handling==== HELPER
// var nodeError = ["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"]
// var mongooseError = ["MongooseError","DisconnectedError","DivergentArrayError","MissingSchemaError","DocumentNotFoundError","MissingSchemaError","ObjectExpectedError","ObjectParameterError","OverwriteModelError","ParallelSaveError","StrictModeError","VersionError"]
// var mongooseErrorFromClient = ["CastError","ValidatorError","ValidationError"];
// var jwtError = ["TokenExpiredError","JsonWebTokenError","NotBeforeError"]

// function nodeErrorMessage(message){
//     switch(message){
//         case "Token is undefined":{
//             return 403;
//         }
//         case "User not found":{
//             return 403;
//         }
//         case "Not Authorized":{
//             return 401;
//         }
//         case "Email is Invalid!":{
//             return 400;
//         }
//         case "Password is Invalid!":{
//             return 400;
//         }
//         case "Incorrect password for register as admin":{
//             return 400;
//         }
//         case "Item id not found":{
//             return 400;
//         }
//         case "Email or Password is invalid": {
//             return 400
//         }
//         default :{
//             return 500;
//         }
//     }
// }

// module.exports = function(errorObject){
//     // console.log("===ERROR OBJECT===")
//     // console.log(errorObject)
//     // console.log("===ERROR STACK===")
//     // console.log(errorObject.stack);

//     let statusCode = 500;  
//     let returnObj = {
//         error : errorObject
//     }
//     if(jwtError.includes(errorObject.name)){
//         statusCode = 403;
//         returnObj.message = "Token is Invalid"
//         returnObj.source = "jwt"
//     }
//     else if(nodeError.includes(errorObject.name)){
//         returnObj.error = JSON.parse(JSON.stringify(errorObject, ["message", "arguments", "type", "name"]))
//         returnObj.source = "node";
//         statusCode = nodeErrorMessage(errorObject.message);
//         returnObj.message = errorObject.message;
//     }else if(mongooseError.includes(errorObject.name)){
//         returnObj.source = "database"
//         returnObj.message = "Error from server"
//     }else if(mongooseErrorFromClient.includes(errorObject.name)){
//         returnObj.source = "database";
//         errorObject.message ? returnObj.message = errorObject.message : returnObj.message = "Bad Request"
//         statusCode = 400;
//     }else{
//         returnObj.source = "unknown error";
//         returnObj.message = "Something error";
//     }
//     returnObj.statusCode = statusCode;
    
//     return returnObj;


// }


// ===jwt====
// const jwt = require('jsonwebtoken')

// function generateToken(payload) {
//     let token = jwt.sign(payload, process.env.JWT_KEY)
//     return token
// }

// function verifyToken(token) {
//     let payload = jwt.verify(token, process.env.JWT_KEY)
//     return payload
// }

// module.exports = {
//     generateToken, verifyToken
// }

// ===router index===
// const express = require('express')
// const router = express.Router()

// // router.get('/', )
// router.use('/users', require('./users'))
// router.use('/products', require('./product'))
// router.use('/transactions', require('./transaction'))

// module.exports = router

// ====router user ====
// const express = require('express')
// const router = express.Router()
// const User = require('../controllers/userController')
// const auth = require('../middlewares/auth')

// /* GET users listing. */
// router.post('/register', User.register)
// router.post('/login', User.login)
// router.get('/', auth.authentication, User.getUser)
// router.post('/logout', auth.authentication, User.logout)
// module.exports = router


// ====app====
// require('dotenv').config()
// const express = require('express')
// const cookieParser = require('cookie-parser')
// const logger = require('morgan')
// const cors = require('cors')
// const indexRouter = require('./routes/index')
// const errorHandler = require('./middlewares/errorHandler')
// const mongoose = require('mongoose')
// const app = express()

// mongoose.connect(process.env.DB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// })

// app.use(cors())
// app.use(logger('dev'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())

// app.use('/', indexRouter)
// app.use(errorHandler)

// module.exports = app