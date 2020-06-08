import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { userTestOne } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createUser, getUsers, login, getProfile } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)

test('Should create a new user', async () => {
  const variables = {
    data: {
      name: "Claudinei",
      email: "claudinei@test.com",
      password: "myPW1234"
    }
  }
  const response = await client.mutate({
    mutation: createUser,
    variables
  })
  const exists = await prisma.exists.User({ id: response.data.createUser.user.id })
  expect(exists).toBe(true)
})

test('Should expose public author profiles', async () => {
  const response = await client.query({ query: getUsers })
  expect(response.data.users.length).toBe(2)
  expect(response.data.users[0].email).toBe(null)
  expect(response.data.users[0].name).toBe('Caetano')
})

test('Should not login with bad credentials', async () => {
  const variables = {
    data: {
      email: "caetano@test.com",
      password: "erewr67@##$"
    }
  }
  await expect(
    client.mutate({ mutation: login, variables })
  ).rejects.toThrow()
})

test('Should not signup user with invalid password', async () => {
  const variables = {
    name: "John doe",
    email: "john@test.com",
    password: "pw01"  
  }
  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow()
})

test('Should fetch user profile', async () => {
  const client = getClient(userTestOne.jwt)
  const { data } = await client.query({ query: getProfile })
  expect(data.me.id).toBe(userTestOne.user.id)
  expect(data.me.name).toBe(userTestOne.user.name)
  expect(data.me.email).toBe(userTestOne.user.email)
})