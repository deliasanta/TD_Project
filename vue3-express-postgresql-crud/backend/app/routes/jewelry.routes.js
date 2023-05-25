module.exports = app => {
  const jewelryController = require("../controllers/jewelry.controller.js");

  let router = require("express").Router();

  // Create a new Jewelry
  router.post("/", jewelryController.create);

  // Retrieve all Jewelry
  router.get("/", jewelryController.findAll);

  // Retrieve all Jewelry by availability
  router.get("/availability/:status", jewelryController.findAllAvailable);

  // Retrieve a single Jewelry with id
  router.get("/:id", jewelryController.findOne);

  // Update a Jewelry with id
  router.put("/:id", jewelryController.update);

  // Delete a Jewelry with id
  router.delete("/:id", jewelryController.delete);

  // Delete all Jewelry
  router.delete("/", jewelryController.deleteAll);

  app.use("/api/tutorials", router);
};
