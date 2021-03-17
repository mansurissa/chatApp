const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('123456', 10);
    const createdAt = new Date();
    const updatedAt = createdAt;

    console.log(updatedAt);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'user1',
        email: 'user1@email.com',
        password: password,
        imageUrl:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80',
        createdAt,
        updatedAt,
      },
      {
        username: 'user2',
        email: 'user2@email.com',
        password: password,
        imageUrl:
          'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2190&q=80',
        createdAt,
        updatedAt,
      },
      {
        username: 'user3',
        email: 'user3@email.com',
        password: password,
        imageUrl:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2122&q=80',
        createdAt,
        updatedAt,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
