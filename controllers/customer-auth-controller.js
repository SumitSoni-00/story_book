// const Customer=require("../models/Customer")
// class CustomerAuthController{
//      async signUp(request, response){
//             try {
//                 const exist = await Customer.findOne({ email: request.body.email });
//                 if(exist) {
//                     return response.status(401).messagejson({ message: 'User already exist'});
//                 }
//                 // Customer c=new Customer({email:request.body.email,
//                 //                         pa})
//                 const user = request.body;
//                 const newUser = new User(user);
//                 await newUser.save();
//                 response.status(200).json(`${user.firstName} has been successfully registered`);
                
//             } catch (error) {
//                 response.json('Error: ', error.message);
//             }
//         }
//     }
// }