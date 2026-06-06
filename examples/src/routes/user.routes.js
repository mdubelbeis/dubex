import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser}  from "../controllers/userController.js";

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUserById).delete(deleteUser).patch(updateUser);

export default router;
