
import express from 'express';
import { createUser, getAllUsers, loginUser } from '../controller/userContoller.js';
import { authorizeRole } from '../middleware/authorizeRole.js';
import { verifyJWToken } from '../middleware/jwtAuth.js';


const router = express.Router();

// Define the route with an optional role parameter
router.post('/:role?/register', createUser);
router.post('/login', loginUser);
router.get("/allUser",verifyJWToken, authorizeRole(["staff", "admin"]), getAllUsers)

export default router;
