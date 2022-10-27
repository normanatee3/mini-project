// import jwt
const jwt = require('jsonwebtoken')
// import user
const User = require('../../models/userModel')
const bcrypt = require('bcryptjs')

// handle create-user route
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        // remove password from output
        newUser.password = undefined

        // Create token
        const token = await jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRATION_DATE }
        )

        // Send JSON RESPONSE
        res.status(201).json({
            status: "success",
            data: {
                newUser,
                token,
            },
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: error,
        })
    }
}

// Define a route handler for retrieving the a single user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        // Assuming no user if found with that id
        if (!user) {
            throw new Error("No user found with that id")
        }
        // Send response
        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
}

// Route for logging in user
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body

        // Assuming email or password was not provided
        if (!email || !password) {
            throw new Error("Email and password are required fields");
        }

        // Find user by email address
        const user = await User.findOne({ email }).select('+password');

        // Throw error if user not found
        if (
            !user ||
            !(await user.comparePassword(password, user.password))
        ) {throw new Error("Invalid email or password");
        }
        const newUser = ({
            name: user.name,
            email: user.email
        })

        const token = await jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRATION_DATE }
        )

        // Send JSON RESPONSE
        res.status(201).json({
            status: "success",
            data: {
                newUser,
                token,
            },
        })
        // res.status(200).json(getUser(user));
    } catch (e) {

        res.status(400).json({ msg: e.message, reason: 'Bad credentials!' })
    }
}
