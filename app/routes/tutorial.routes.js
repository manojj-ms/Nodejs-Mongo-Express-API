module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/create", tutorials.create);

    // Retrieve all Tutorials
    router.get("/getall", tutorials.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);

    // Update a Tutorial with id
    router.put("/update/:id", tutorials.update);

    // Delete a Tutorial with id
    router.delete("/delete/:id", tutorials.delete);

    // Create a new Tutorial
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
};