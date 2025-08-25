import express from "express";
import {
  createTour,
  getAllTours,
  getTourById,
  updateTour,
  deleteTour,
  checkID,
} from "../controllers/tourController.js";

// Create router
const router = express.Router();

// PARAM MIDDLEWARE
router.param("id", (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  next();
});

// Define routes
router.param("id",checkID)
router.route("/").get(getAllTours).post(checkTour,createTour);
router.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

// Export router
export default router;
