import User from "../model/userModel";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const createUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const { role } = req.params;
    const user = new User(req.body);

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
    
    //This if statement is to check the roles of the user in the database and what they can do and not to do

    
  } catch (error) {
    return res.status(400).send(error);
  }
};
