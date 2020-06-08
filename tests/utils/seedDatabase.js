import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const userTestOne = {
  input: {
    name: 'Caetano',
    email: 'caetano@test.com',
    password: bcrypt.hashSync('ER#$#@%RA')
  },
  user: undefined,
  jwt: undefined
}

const userTestTwo = {
  input: {
    name: 'Souza',
    email: 'souza@test.com',
    password: bcrypt.hashSync('ER#$#@%RA')
  },
  user: undefined,
  jwt: undefined
}

const postTestOne = {
  input: {
    title: 'Post published',
    body: 'Post for test',
    published: true,
  },
  post: undefined
}

const postTestTwo = {
  input: {
    title: 'Post not published',
    body: 'Post for test',
    published: false,
  },
  post: undefined
}

const commentTestOne = {
  input: {
    text: 'This comment was create for the test One'
  },
  comment: undefined
}

const commentTestTwo = {
  input: {
    text: 'This comment was created for the test Two'
  },
  comment: undefined
}

const seedDatabase = async () => {
  await prisma.mutation.deleteManyComments()
  await prisma.mutation.deleteManyPosts()
  await prisma.mutation.deleteManyUsers()
  
  userTestOne.user = await prisma.mutation.createUser({
    data: userTestOne.input
  })
  userTestOne.jwt = jwt.sign({ userId: userTestOne.user.id }, process.env.JWT_SECRET)
  
  userTestTwo.user = await prisma.mutation.createUser({
    data: userTestTwo.input
  })
  userTestTwo.jwt = jwt.sign({ userId: userTestTwo.user.id }, process.env.JWT_SECRET)
  
  postTestOne.post = await prisma.mutation.createPost({
    data: {
      ...postTestOne.input,
      author: {
        connect: {
          id: userTestOne.user.id
        }
      }
    }
  })
  
  postTestTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTestTwo.input,
      author: {
        connect: {
          id: userTestOne.user.id
        }
      }
    }
  })
  
  commentTestOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentTestOne.input,
      author: {
        connect: {
          id: userTestTwo.user.id
        }
      },
      post: {
        connect: {
          id: postTestOne.post.id
        }
      }
    }
  })
  commentTestTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTestTwo.input,
      author: {
        connect: {
          id: userTestOne.user.id
        }
      },
      post: {
        connect: {
          id: postTestOne.post.id
        }
      }
    }
  })
}

export { 
  seedDatabase as default, 
  userTestOne, 
  userTestTwo, 
  postTestOne, 
  postTestTwo,
  commentTestOne,
  commentTestTwo
}