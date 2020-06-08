import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { userTestOne, commentTestOne, commentTestTwo, postTestOne } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { deleteComment, subscribeToComments, subscribeToPosts } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)

test('Should delete own comment', async () => {
  const client = getClient(userTestOne.jwt)
  const variables = {
    id: commentTestTwo.comment.id
  }
  await client.mutate({ mutation: deleteComment, variables })
  const exists = await prisma.exists.Comment({ id: commentTestTwo.comment.id })
  
  expect(exists).toBe(false)
})

test('Should not delete other users comment', async () => {
  const client = getClient(userTestOne.jwt)
  const variables = {
    id: commentTestOne.comment.id
  }
  await expect(
    client.mutate({ mutation: deleteComment, variables })
  ).rejects.toThrow()
})
/*
test('Should subscribe to comments for a post', async (done) => {
  const variables = {
      postId: postTestOne.post.id
  }
  client.subscribe({ query: subscribeToComments, variables }).subscribe({
      next(response) {
        expect(response.data.comment.mutation).toBe('DELETED')
        console.log(response.data.comment.mutation)
        done()
      }
  })

  await prisma.mutation.deleteComment({ where: { id: commentTestOne.comment.id }})
})

test('Should subscribe to changes for published posts', async (done) => {
  client.subscribe({ query: subscribeToPosts }).subscribe({
      next(response) {
        expect(response.data.post.mutation).toBe('DELETED')
        done()
      }
  })

  await prisma.mutation.deletePost({ where: { id: postTestOne.post.id } })
})
*/