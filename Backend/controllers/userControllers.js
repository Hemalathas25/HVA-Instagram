import User from '../models/userModel.js';

/**   
 *  @desc   Register user
 *  @route  POST/ api/users
 *  @access public 
 */

    const registerUser = async(req,res) => {
        const { email, password } = req.body;

        try{
            const user = await createUser(email, password);
            generateToken(res, user._id)

            res.status(201).json({
                _id: user._id,
                email: user.email,
            })
        }catch (error){
            res.status(401).json({
                message: "Invaild email or password"
            })
        }
    }

/**   
 * @desc   Auth user & get taken
 * @route  POST/api/users/login
 * @access Public 
*/

    const authUser = async(req, res) => {
        const { email, password } = req.body;
        const user = await authenticateUser(email, password)
        try {
            if(user){
                generateToken(res, user._id)({
                    _id: user._id,
                    email: user.email,
                });
            }else{
                res.status(401).json({
                    message: "Invaild email or password"
                })
            }
        } catch (error) {
            res.status(500).json({ message: "Invaild Parameters"})
        }
    };

    /**
     * @desc Get User by Id
     * @route GET/api/users/:id
     * @access Public 
     */


const getUserById = async(req, res) => {
    try {
        const user = await getUser(req.params.id)
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({
                message: "User Not Found"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid User ID"
        })
    }
}
export { registerUser , authUser , getUserById }