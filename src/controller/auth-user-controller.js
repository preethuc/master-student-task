import User from "../model/auth-user-model";
import { tokenGenerator } from "../auth-token/token-generator";
import bcrypt from "bcrypt";

// POST - Signup
export function signup(req, res, next) {
  try {
    bcrypt.hash(req.body.password, 10, (error, hash) => {
      if (error) {
        res.status(500).json({
          error: error,
        });
      } else {
        const user = new User({
          name: req.body.name,
          email_id: req.body.email_id,
          role: req.body.role,
          password: hash,
        });
        user.auth_token = tokenGenerator(user);
        user.save();
        res.status(201).json({
          status: "success",
          message: "Registered successfully",
          user: {
            name: user.name,
            email_id: user.email_id,
            role: user.role,
            auth_token: user.auth_token,
          },
        });
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// POST - Login
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      bcrypt.compare(req.body.password, user.password, async (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "please enter the valid password",
          });
        } else {
          const data = await User.findOneAndUpdate(
            { name: req.body.name },
            { logged_in: true },
            { new: true }
          );
          res.status(200).json({
            message: "logged in successfully",
            data: data,
          });
        }
      });
    } else {
      res.status(404).json({
        message: "user not found",
      });
    }
  } catch (error) {
    res.send(error.message);
  }
};

// POST - Logout
export const logout = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { name: req.body.name },
      { logged_in: false },
      { new: true }
    );
    res.status(200).json({
      message: "Signed out successfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET - finding the Master Role
export const validateRole = async (req, res, next) => {
  try {
    const user = await User.find({ role: "master" })
    res.status(200).json({
      status:"success",
      message: "Master is Identified",
      data:user
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// GET - ALL Users
export const allUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json({
      status: "success",
      results:users.length,
      message: "List of Users",
      data: users
    })
  } catch (error) {
    res.status(500).send(error.message);
    
  }
}
