"use strict";
const fs = require("fs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let users = JSON.parse(
      fs.readFileSync("./seeders/data/user.json", "utf8")
    );
    let userData = users.map((user) => {
      const { name, email, password, birthdate, gender, avatar, type } = user;
      return {
        name,
        email,
        password,
        birthdate,
        gender,
        avatar,
        type,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("Users", userData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
