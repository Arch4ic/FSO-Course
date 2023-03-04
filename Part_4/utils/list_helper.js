const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.map(l => sum += l.likes)

  return sum
}

const favoriteBlog = (blogs) => {
  let likes = blogs.map(l => l.likes)
  let index = likes.indexOf(Math.max(...likes))
  console.log(blogs[index])
  return blogs[index]
}


module.exports = {
  dummy, totalLikes,favoriteBlog
}