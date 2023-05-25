const db = require("../models");
const Jewelry= db.jewelry;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!"
    });
    return;
  }

  if (!req.body.materials) {
    res.status(400).send({
      message: "Materials can not be empty!"
    });
    return;
  }

  if (!req.body.product_type) {
    res.status(400).send({
      message: "Product type can not be empty!"
    });
    return;
  }

  if (!req.body.color) {
    res.status(400).send({
      message: "Color can not be empty!"
    });
    return;
  }

  if (!req.body.length) {
    res.status(400).send({
      message: "Length can not be empty!"
    });
    return;
  }

  if (!req.body.price) {
    res.status(400).send({
      message: "Price can not be empty!"
    });
    return;
  }

// Create a Jewelry
  const jewelry = {
    name: req.body.name,
    materials: req.body.materials,
    product_type: req.body.product_type,
    color: req.body.color,
    length: req.body.length,
    price: req.body.price,
    availability: req.body.availability ? req.body.availability : false,
    added_date: new Date(),
    popularity: req.body.popularity ? req.body.popularity : 0,
    brand: req.body.brand,
    description: req.body.description
  };


  // Save Jewelry in the database
  Jewelry.create(jewelry)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while creating the Jewelry."
        });
      });
};



// Retrieve all Jewelries from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Jewelry.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving jewelries."
        });
      });
};


// Find a single Jewelry with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Jewelry.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Jewelry with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Jewelry with id=" + id
        });
      });
};


// Update a Jewelry by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Jewelry.update(req.body, {
    where: { id: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Jewelry was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Jewelry with id=${id}. Maybe Jewelry was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Jewelry with id=" + id
        });
      });
};


// Delete a Jewelry with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Jewelry.destroy({
    where: { id: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Jewelry was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Jewelry with id=${id}. Maybe Jewelry was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Jewelry with id=" + id
        });
      });
};


// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Jewelry.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Jewelries were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all jewelries."
      });
    });
};

// Find all available Jewelry
exports.findAllAvailable = (req, res) => {
  Jewelry.findAll({ where: { availability: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving jewelry."
        });
      });
};
