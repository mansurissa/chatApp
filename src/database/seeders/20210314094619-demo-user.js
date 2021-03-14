/* eslint-disable arrow-body-style */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        userName: 'user1',
        email: 'user1@test.test',
        password:
          '$2b$10$8eToveRwfP5MoPQmhcbX1eMSFGKPbW0HEh592vqLLZkQlAdURqrLu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: 'user2',
        email: 'user2@test.test',
        password:
          '$2b$10$8eToveRwfP5MoPQmhcbX1eMSFGKPbW0HEh592vqLLZkQlAdURqrLu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: 'user3',
        email: 'user3@test.test',
        password:
          '$2b$10$8eToveRwfP5MoPQmhcbX1eMSFGKPbW0HEh592vqLLZkQlAdURqrLu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  },
};
