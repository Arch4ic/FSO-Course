const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'testing',
    author: 'me',
    url: 'test.url.com',
    likes: 2
  },
  {
    title: 'moreTesting',
    author: 'alsoMe',
    url: 'another.url.com',
    likes: 5
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'excessthing' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}