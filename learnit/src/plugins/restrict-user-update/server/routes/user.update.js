module.exports = {
  method: 'PUT',
  path: '/users/:id',
  handler: 'User.update',
  config: {
    policies: ['restrict-user-update']
  }
};
