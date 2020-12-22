'use strict';

const { v4 } = require("uuid")
const faker = require("faker");

const user = []
const userCount = 30
let count = 0
while (count < userCount) {
  user.push({
    id: v4(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.random.number(),
    age: faker.random.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  count++
}

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
    await queryInterface.bulkInsert('users', user)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', {})
  }
};
