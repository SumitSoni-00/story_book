import Joi from 'joi';
import { User, RefreshToken } from '../../models';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { REFRESH_SECRET } from '../../config';

const registerController = {
    async register(req, res, next) {
        // CHECKLIST
        // [ ] validate the request
        // [ ] authorise the request
        // [ ] check if user is in the database already
        // [ ] prepare model
        // [ ] store in database
        // [ ] generate jwt token
        // [ ] send response
        if (true) {//req.body.which_type === "email") {

            // Validation
            const registerSchema = Joi.object({
                //name: Joi.string().min(3).max(30).required(),
                email: Joi.string().email().required(),
                password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
                repeat_password: Joi.ref('password')
            });
            const { error } = registerSchema.validate(req.body);
            if (error) {
                return res.json({ "message": "request data validation failed" });
            }
            // check if user is in the database already
            try {
                const exist = await User.exists({ email: req.body.email });
                if (exist) {
                    return next(CustomErrorHandler.alreadyExist('This email is already taken.'));
                }
            } catch (err) {
                return res.json({ "message": "user already registered" });
            }
            const { email, password } = req.body;

            // Hash password
            //const hashedPassword = await bcrypt.hash(password, 10); //will be done in pre

            // prepare the model

            const user = new User({

                email,
                password
            });

            let access_token;
            let refresh_token;
            try {
                const result = await user.save();
                console.log(result);

                // Token
                // access_token = JwtService.sign({ _id: result._id, role: result.role });
                // refresh_token = JwtService.sign({ _id: result._id, role: result.role }, '1y', REFRESH_SECRET);

                const { accessToken, refreshToken } = tokenService.generateTokens({
                    _id: user._id,
                    activated: false,
                });
                // database whitelist
                //await RefreshToken.create({ token: refresh_token });
                await tokenService.storeRefreshToken(refreshToken, user._id);
                res.cookie('refreshToken', refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                });

                res.cookie('accessToken', accessToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                });
                const userDto = new UserDto(user);
                res.json({ user: userDto, auth: true });
            } catch (err) {
                return next(err);
            }

            res.json({ access_token, refresh_token });
        }
    }
}


export default registerController;