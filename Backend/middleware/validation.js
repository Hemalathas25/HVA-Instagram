import Joi from 'joi';

const signUpSchema = Joi.object({
    
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    
});

const signUpValidation = (req, res, next) => {
    
    const { error, value } = signUpSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message 
        });
    }
    next();

};

export default signUpValidation;
 
