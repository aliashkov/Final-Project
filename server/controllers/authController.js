const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const refresh = (req, res) => {
    //take the refresh token from the user
    const refreshToken = req.body.token;

    //send error if there is no token or it's invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        refreshTokens.push(newRefreshToken);

        res.status(200).json({
            
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    });

};

const generateAccessToken = (user) => {
    return jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, "mySecretKey", {
        expiresIn: "1s",
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};


const register = async (req, res) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json("User not found");
        }
        else {
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (validPassword) {
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.json({
                    _id : user._id,
                    username : user.username,
                    profilePicture : user.profilePicture,
                    followers : user.followers,
                    followings : user.followings,
                    isAdmin : user.isAdmin,
                    description : user.description,
                    city : user.city,
                    country : user.country,
                    relationship : user.relationship,
                    accessToken,
                    refreshToken,
                });
            }
            else {
                res.status(400).json("Wrong password")
            }
        }


    } catch (err) {
        res.status(500).json(err)
    }
};

const logout = async (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully.");
};

module.exports = {
    register,
    login,
    logout,
    refresh
}