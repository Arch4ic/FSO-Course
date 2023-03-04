const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
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

    expect(response.body.likes).toBeDefined()
  })



  test('blog without content is not added', async () => {
    const newBlog = {
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
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
    await api
      .delete(`/api/blogs/${result.body.id}`)
      .expect(204)
  })

  /*test('Wrong id gives status 400', async () => {
    const wrongID = 123456
    await api
      .delete(`/api/blogs/${wrongID}`)
      .expect(400)
  }) */
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
    const updatedBlog = {
      likes: 10
    }
    await api
      .put(`/api/blogs/${result.body.id}`)
      .send(updatedBlog)
      .expect(200)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})