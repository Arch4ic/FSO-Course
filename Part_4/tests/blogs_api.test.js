const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('salasana', 10)
  const user = new User({ username: 'user', name: 'Root User', password: passwordHash })

  await user.save()

  const userToken = {
    username: user.username,
    id: user.id
  }
  token = jwt.sign(userToken, process.env.SECRET)

  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('Blogs tests', () => {
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the first blog is about testing', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContain(
      'testing'
    )
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Identifying zone is called id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST tests', () => {

  test('No valid title or url', async () => {
    const newBlog = {
      author: 'Surprise its still me',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async test',
      author: 'Joo taas minä',
      url: 'async.url.com',
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'async test'
    )
  })

  test('If blog without likes is posted 0 is set as default ', async () => {
    const newBlog = {
      title: 'Post without likes',
      author: 'Guess its me again',
      url: 'noLikes.url.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)

    expect(response.body.likes).toBeDefined()
  })



  test('blog without content is not added', async () => {
    const newBlog = {
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('DELETE tests', () => {
  test('delete return status 204 test', async () => {
    const newBlog = {
      title: 'Delete stuff',
      author: ':))',
      url: 'getaway.com',
      likes: 20
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
    await api
      .delete(`/api/blogs/${result.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)
  })
})

describe('PUT tests', () => {

  test('PUT returns status 200', async () => {
    const newBlog = {
      title: 'Delete stuff',
      author: ':))',
      url: 'getaway.com',
      likes: 20
    }
    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
    const updatedBlog = {
      likes: 10
    }
    await api
      .put(`/api/blogs/${result.body.id}`)
      .send(updatedBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
  })
})
describe('Token test', () => {
  test('Expect 401 status', async () => {
    const newBlog = {
      title: 'auth test',
      author: 'Joo eiköhän se oo taas minä',
      url: 'auth.url.com',
      likes: 20
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer bad token')
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})