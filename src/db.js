const users = [{
  id: '1',
  name: 'Claudinei',
  email: 'claudinei@mail.com',
  age: 27
}, {
  id: '2',
  name: 'Caetano',
  email: 'caetano@mail.com'
}, {
  id: '3',
  name: 'Souza',
  email: 'souza@mail.com',
  age: 38
}]

const posts = [{
  id: '10',
  title: 'GraphQL 101',
  body: 'This is how to use GraphQL ...',
  published: true,
  author: '1',
  comment: '104'
}, {
  id: '11',
  title: 'GraphQL 201',
  body: 'This is an advanced GraphQL post ...',
  published: false,
  author: '1',
  comment: '102'
}, {
  id: '12',
  title: 'All about Game of Thrones',
  body: '',
  published: false,
  author: '2'
}]

const comments = [{
  id: "102",
  text: "My first comment",
  author: '1',
  post: '10'
}, {
  id: "103",
  text: "My second comment",
  author: '1',
  post: '10'
}, {
  id: "104",
  text: "My third comment",
  author: '3',
  post: '11'
}, {
  id: "105",
  text: "My four comment",
  author: '2',
  post: '12'
}]

const db = {
  users,
  posts,
  comments
}

export { db as default }