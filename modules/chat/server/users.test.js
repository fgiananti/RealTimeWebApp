const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }]
  });

  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'Fra',
      room: 'Inter'
    };
    const resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    let userId = '2';
    let user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    let userId = '99';
    let user = users.removeUser(userId);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    let userId = '2';
    let user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find a user', () => {
    let userId = '99';
    let user = users.getUser(userId);
    expect(user).toBeFalsy();
  });

  it('should return names for node course', () => {
    let userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike','Julie']);
  });

  it('should return names for node course', () => {
    let userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });
});
