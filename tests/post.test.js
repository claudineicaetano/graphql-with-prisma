import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { userTestOne, postTestOne, postTestTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { getPosts, myPosts, createPost, updatePost, deletePost } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)

test('Should expose published posts', async () => {
  const response = await client.query({ query: getPosts })  
  expect(response.data.posts.length).toBe(1)
  expect(response.data.posts[0].published).toBe(true)
})

test('Should fetch users posts', async () => {
  const client = getClient(userTestOne.jwt)
  const { data } = await client.query({ query: myPosts })
  expect(data.myPosts.length).toBe(2)
})

test('Should be able to update own post', async () => {
  const client = getClient(userTestOne.jwt)
  const variables = {
    id: postTestOne.post.id,
    data: {
      published: false
    }
  }
  const { data } = await client.mutate({ mutation: updatePost, variables })
  const exists = await prisma.exists.Post({ id: postTestOne.post.id, published: false })
  expect(data.updatePost.published).toBe(false)
  expect(exists).toBe(true)
})

test('Should create a new post', async () => {
  const client = getClient(userTestOne.jwt)
  const variables = {
    data: {
      title: "Testing Create a new post",
      body: "body for test",
      published: true
    }
  }
  const { data } = await client.mutate({ mutation: createPost, variables }) 
  expect(data.createPost.title).toBe('Testing Create a new post')
  expect(data.createPost.body).toBe('body for test')
  expect(data.createPost.published).toBe(true)
})

test('Should be delete post', async () => {
  const client = getClient(userTestOne.jwt)
  const variables = {id: postTestTwo.post.id}
  await client.mutate({ mutation: deletePost, variables })
  const exists = await prisma.exists.Post({ id: postTestTwo.post.id })
  expect(exists).toBe(false)
})