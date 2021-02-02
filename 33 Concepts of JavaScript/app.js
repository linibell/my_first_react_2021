let users = ['user1', 'user2', 'user3', 'user4'];

export const addUsers = (user) => (users = [...users, user]);

export const getUsers = () => users;

export const deleteUser = (user) => (users = users.filter(aUser => aUser !== user));