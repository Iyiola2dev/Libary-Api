import User from "../model/userModel";
import dotenv from "dotenv";

dotenv.config();

export const createUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const { role } = req.params;
    const user = new User(req.body);

    //Check if User Exists in the Database
    const existingUser = 
  } catch (error) {
    return res.status(400).send(error);
  }
};
