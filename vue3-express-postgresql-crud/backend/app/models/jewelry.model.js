module.exports = (sequelize, Sequelize) => {
  const Jewelry = sequelize.define("jewelry", {
    name: {
      type: Sequelize.STRING
    },
    materials: {
      type: Sequelize.STRING
    },
    product_type: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
    length: {
      type: Sequelize.FLOAT
    },
    price: {
      type: Sequelize.FLOAT
    },
    availability: {
      type: Sequelize.BOOLEAN
    },
    added_date: {
      type: Sequelize.DATE
    },
    popularity: {
      type: Sequelize.FLOAT
    },
    brand: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Jewelry;
};
