import express from "express";
const router = express.Router();

// Import the functions from the service
import {
  createNewFragrance,
  updateExistingFragrance,
  deleteFragrance,
  getAllFragrances,
} from "../services/fragrance-service.js";

// Fragrance routes

// Create new fragrance
router.put("/", createNewFragrance);

// Update existing fragrance
router.post("/", updateExistingFragrance);

// Delete fragrance
router.delete("/:id", deleteFragrance);

//Get all fragrances
router.get("/", getAllFragrances);

export default router;
