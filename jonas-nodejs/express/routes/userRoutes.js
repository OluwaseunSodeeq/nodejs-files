import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
const router = express.Router();

// PARAM MIDDLEWARE
router.param("id", (req, res, next, val) => {
  console.log(`User id is: ${val}`);
  next();
});

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

export default router;
