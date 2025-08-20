import express from "express";
import {
  createTour,
  getAllTours,
  getTourById,
  updateTour,
  deleteTour,
} from "../handlers/toursHandlers.js";

// Create router
const router = express.Router();

// Define routes
router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

// Export router
export default router;
