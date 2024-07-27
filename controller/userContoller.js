import User from "../model/userModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import Book from "../model/bookSchema.js"
dotenv.config();

export const createUser = async (req, res) => {

  try {
    const { userName, password } = req.body;
    const { role } = req.params;
    const user = new User(req.body);

    if (!userName || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    //Check if User Exists in the Database
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username Taken try somthing else" });
    }

    //amount of times salts are generated into the password makes it harder to crack

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;

    //This if statement is to create and check the roles of the user in the database and what they can do and not to do

    if (role === 'admin' || role === 'staff' || role === "user"){
      user.role = role;
      await user.save();
      res.status(201).json({
        status: "success",
        message: `${user.role} created successfully`
      })
    }else{
      user.role = "user";
      
      await user.save();
      res.status(201).json({
        status: "success",
        message: `${user.role} created successfully`
      })
      
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};


// login

export const loginUser = async (req, res)=>{
  try{
    const { userName, password} = req.body;

    //This is to check the username and password
    if(!userName || !password){
      return res.status(404).json({
        status: "404",
        message:"Provide a username or password"
      })
    }
    const user = await User.findOne({userName})
    if(!user){
      return res.status(401).json({
       message:"Invaild credentials"
      })
    }

      //This is to compare the password already stored in the database if the one inputed is correct
      const isCorrectPassword = await bcrypt.compare( password, user.password)
      if(!isCorrectPassword){
        return res.status(404).json({
          status: "404",
          message:"The password you inputted is incorrect"
      })
      }

       //This is the token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "success",
      message: `${user.role} created successfully`,
      token,
    });
  }catch(error){
    return res.status(500).json({
      status: "error",
      message: "An error occured while trying to login "
    })
  }
}


//This is to get all users
export const getAllUsers = async (req, res)=>{
  try{
    const users = await User.find({}, {password:0});
  return res.status(200).json({users});

  }catch(errors){
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching users" });
  }

}

//