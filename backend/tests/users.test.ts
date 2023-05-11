import app from '../app'
import request from 'supertest'
import { connectMockDB, disconnectMockDB } from '../src/mockDB'
import { usersServices } from '../src/services/users.services'
import { userMock, updatedUserMock } from '../src/fixtures'

beforeAll(async () => connectMockDB())
afterAll(async () => disconnectMockDB(), 15000)

// describe('create user', () => {
//   it('should create user when POST on /users', async () => {
//     await request(app)
//     .post('/users')
//     .send(userMock)
//     .expect(201)
//   })
// })

// describe('update user', () => {
//   it('should update user when UPDATE on /users/:userId', async () => {
//     const user = await usersServices.createUser(userMock)
//     await request(app)
//     .patch('/users/' + user.id)
//     .send(updatedUserMock)
//     .expect(201)
//     .then(async () => {
//       const updatedUser = await getUsers(updatedUserMock)
//       expect(updatedUser[0].username).toEqual(updatedUserMock.username)
//       expect(updatedUser[0].email).toEqual(updatedUserMock.email)
//     })
//   })
// })

// describe('delete user', () => {
//   it('should delete user when DELETE on /users/:userId', async () => {
//     const user = await usersServices.deleteUser(userMock)
//     await request(app)
//     .del('/users/' + user.id)
//     .expect(201)
//     .then(async () => {
//       const deletedUser = await usersServices.getUsers({_id: user.id})
//       expect(deletedUser[0]).toBeFalsy()
//     })
//   })
// })
