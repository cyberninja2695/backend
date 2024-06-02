module.exports = app => {
    const tutorials = require("../controllers/cyberninja.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", cyberninja.create);
  
    // Retrieve all Tutorials
    router.get("/", cyberninja.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", cyberninja.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", cyberninja.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", cyberninja.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", cyberninja.delete);
  
    // Create a new Tutorial
    router.delete("/", cyberninja.deleteAll);
  
    app.use('/api/cyberninja', router);
  };