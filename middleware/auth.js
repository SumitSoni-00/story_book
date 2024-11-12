



// exports.requireSignin = (req, res, next) => {
//   if (req.headers.authorization) {
//     const token = req.headers.authorization.split(" ")[1];
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = user;
//   } else {
//     return res.status(400).json({ message: "Authorization required" });
//   }
//   next();
//   //jwt.decode()
// };

// exports.userMiddleware = (req, res, next) => {
//   if (req.user.role !== "user") {
//     return res.status(400).json({ message: "User access denied" });
//   }
//   next();
// };

// // module.exports = {
// //   ensureAuth: function (req, res, next) {
// //     if (req.isAuthenticated()) {
// //       return next()
// //     } else {
// //       res.redirect('/')
// //     }
// //   },
// //   ensureGuest: function (req, res, next) {
// //     if (!req.isAuthenticated()) {
// //       return next();
// //     } else {
// //       res.redirect('/dashboard');
// //     }
// //   },
// // }
