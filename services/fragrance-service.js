import { EntityId } from "redis-om";
import { fragranceRepository } from "../schema/fragrance.js";
import e from "express";

const createNewFragrance = async (req, res) => {
  try {
    // Created at
    req.body.created_at = new Date().toISOString();

    const fragrance = await fragranceRepository.save(req.body);

    // Redis Om does not create an id field for the object automatically
    // So we need to set it manually
    fragrance.id = fragrance[EntityId];
    await fragranceRepository.save(fragrance);

    res.send(fragrance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error Creating New Fragrance");
  }
};

const updateExistingFragrance = async (req, res) => {
  try {
    // Updated at
    req.body.updated_at = new Date().toISOString();
    // Find the fragrance by id and update it
    const existingFragrance = await fragranceRepository
      .search()
      .where("id")
      .equalTo(req.body.id)
      .return.first();

    if (!existingFragrance) {
      return res.status(404).send("Fragrance not found");
    }

    // Update the fields with the new values or keep the old values
    existingFragrance.name = req.body.name || existingFragrance.name;
    existingFragrance.description =
      req.body.description || existingFragrance.description;
    existingFragrance.category =
      req.body.category || existingFragrance.category;
    existingFragrance.updated_at =
      req.body.updated_at || existingFragrance.updated_at;
    existingFragrance.image_url =
      req.body.image_url || existingFragrance.image_url;

    const fragranceUpdate = await fragranceRepository.save(existingFragrance);

    res.send(fragranceUpdate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error Updating Fragrance");
  }
};

const deleteFragrance = async (req, res) => {
  try {
    const fragrance = await fragranceRepository.remove(req.params.id);
    // Send success response with string
    res.send("Fragrance Deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error Deleting Fragrance");
  }
};

const getAllFragrances = async (req, res) => {
  try {
    const fragrances = await fragranceRepository.search().returnAll();
    res.send(fragrances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error Fetching All Fragrances");
  }
};

export {
  createNewFragrance,
  updateExistingFragrance,
  deleteFragrance,
  getAllFragrances,
};
