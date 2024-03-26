import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js'

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
 * @desc   Create Account
 * @route  POST/api/users/create
 * @access public
 */

   const createUserAccount = async(req, res) => {
    const { name, dateOfBirth, gender } = req.body;
    try {
        const username = await generateUsername(name);

        if(users.some(user => user.username === username)){
            return res.status(409).json({ error: 'User already exists'});
        }
        // Create user object
    const newUser = {
        username,
        name,
        dateOfBirth,
        gender,
        password
    };
     // Add user to database
     users.push(newUser);
     return res.status(201).json({ message: 'User account successfully created', user: newUser });

    // Function to generate username based on name and date of birth
    function generateUsername(name, dateOfBirth) {
    const firstName = name.split(' ')[0].toLowerCase();
    const birthYear = new Date(dateOfBirth).getFullYear();
    return firstName + birthYear;
}

    } catch (error) {
        res.status(401).json({
            message: "Invaild email or password"
        })
    }
}

/**
 * @desc   Update Profile
 * @route  POST/api/users/update
 * @access public
 */

const updateUserProfile = async (req, res) => {
    try {
        const { profilePicture, name, username, bio, website } = req.body;

        userProfile.profilePicture = profilePicture;
        userProfile.name = name;
        userProfile.username = username;
        userProfile.bio = bio;
        userProfile.website = website;

        res.status(200).json({ message: 'User profile updated successfully', profile: userProfile });
    } catch (error) {
        
        res.status(500).json({ message: 'An error occurred while updating user profile' });
    }
};

/**
 * @desc   Add Account
 * @route  POST/api/users/add
 * @access public
 */

const addAccount = async(req, res) => {
    try {
        const { username, password } = req.body;

        // Check if a user with the same username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Create a new user account
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: 'User account created successfully', user: newUser });
    } catch (error) {
        console.error('An error occurred while adding user account:', error);
        res.status(500).json({ error: 'An error occurred while adding user account' });
    }
};


/**   
 * @desc   Auth user & get taken
 * @route  POST/api/users/login
 * @access public 
*/

    const authUser = async(req, res) => {
        const { emailOrUsername, password } = req.body;
        const user = await authenticateUser(emailOrUsername, password)
        try {
            if(user){
                generateToken(res, user._id)({
                    _id: user._id,
                    emailOrUsername: user.emailOrUsername,
                });
            }else{
                res.status(401).json({
                    message: "Invaild Username or password"
                })
            }
        } catch (error) {
            res.status(500).json({ message: "Invaild Parameters"})
        }
    };

 /**
  * @desc  logout user
  * @route POST/api/users/logout
  * @access Private
  */
    
 const logoutUser = async (req, res) => {
    try {
        // Your asynchronous code here
        await new Promise((resolve, reject) => {
            res.cookie('jwt', '', {
                httpOnly: true,
                expires: new Date(0)
            }, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        res.status(200).json({ message: 'Logged out successfully'});
    } catch (error) {
        // Handle any errors that might occur
        res.status(500).json({ message: 'An error occurred while logging out' });
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

/**   
 *  @desc   Search user
 *  @route  GET/ api/users/search
 *  @access public 
 */

const search = async(req, res) => {
        try {
            const { query } = req.query;
            const users = await User.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } }, 
                    { username: { $regex: query, $options: 'i' } } 
                ]
            });
    
            res.status(200).json(users);
        } catch (error) {
        console.error('An error occurred while searching for users:', error);
            res.status(500).json({ error: 'user not found' });
        }
};

/**
 * @desc  Delete User
 * @route DELETE/api/users/:id
 * @access Private
 */

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
        console.error('An error occurred while deleting user profile:', error);
        res.status(500).json({ error: 'An error occurred while deleting user profile' });
    }
};


export {
     registerUser ,
     authUser ,
     getUserById,
     createUserAccount, 
     logoutUser,
     updateUserProfile,
     addAccount,
     search,
     deleteUser
    }