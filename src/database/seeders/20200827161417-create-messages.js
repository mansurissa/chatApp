const { v4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log('Hello world');
    return queryInterface.bulkInsert('Messages', [
      {
        uuid: v4(),
        content: 'Hey user2!',
        from: 'user1',
        to: 'user2',
        createdAt: '2021-03-16 11:03:13.716+02',
        updatedAt: '2021-03-16 11:03:13.716+02',
      },
      {
        uuid: v4(),
        content: "Hey user1, how's it going?",
        from: 'user2',
        to: 'user1',
        createdAt: '2021-03-16 12:03:13.716+02',
        updatedAt: '2021-03-16 12:03:13.716+02',
      },
      {
        uuid: v4(),
        content: 'Not too bad, just getting to work, you?',
        from: 'user1',
        to: 'user2',
        createdAt: '2021-03-16 13:03:13.716+02',
        updatedAt: '2021-03-16 13:03:13.716+02',
      },
      {
        uuid: v4(),
        content: "I'm working from home now",
        from: 'user2',
        to: 'user1',
        createdAt: '2021-03-16 14:03:13.716+02',
        updatedAt: '2021-03-16 14:03:13.716+02',
      },
      {
        uuid: v4(),
        content: "That's cool! I'm joining the 'remote club' too",
        from: 'user1',
        to: 'user2',
        createdAt: '2021-03-16 15:03:13.716+02',
        updatedAt: '2021-03-16 15:03:13.716+02',
      },
      {
        uuid: v4(),
        content: 'Really? how come?',
        from: 'user2',
        to: 'user1',
        createdAt: '2021-03-16 16:03:13.716+02',
        updatedAt: '2021-03-16 16:03:13.716+02',
      },
      {
        uuid: v4(),
        content: 'got promoted to a consultancy role',
        from: 'user1',
        to: 'user2',
        createdAt: '2021-03-16 11:07:13.716+02',
        updatedAt: '2021-03-16 11:07:13.716+02',
      },
      {
        uuid: v4(),
        content: "That's amazing!! well done!",
        from: 'user2',
        to: 'user1',
        createdAt: '2021-03-16 11:06:13.716+02',
        updatedAt: '2021-03-16 11:06:13.716+02',
      },
      {
        uuid: v4(),
        content: 'Thanks ;)',
        from: 'user1',
        to: 'user2',
        createdAt: '2021-03-16 11:09:13.716+02',
        updatedAt: '2021-03-16 11:09:13.716+02',
      },
      {
        uuid: v4(),
        content: 'Hey user1, are you done with that task?',
        from: 'user2',
        to: 'user1',
        createdAt: '2021-03-16 11:13:13.716+02',
        updatedAt: '2021-03-16 11:13:13.716+02',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Messages', null, {});
  },
};
