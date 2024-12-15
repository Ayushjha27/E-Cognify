import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            //HTTP 400 Bad Request
            return res.status(400).json({
                success: false,
                message: "All feilds are required"
            })
        }
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully."
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to register."
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            //HTTP 400 Bad Request
            return res.status(400).json({
                success: false,
                message: "All feilds are required"
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if ((!isPasswordMatch)) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to login."
        })
    }
}