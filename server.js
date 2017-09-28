const express = require('express')
// create my application Object
const app = express()
// environment variables
const port = process.env.PORT || 3000
// bring in the morgan Module
const logger = require('morgan')
// using the middleware to display http request information
app.use(logger('dev'))

// http methods GET, POST, PUT/PATCH , DELETE
app.get('/', (req, res) => {
  // send the view to the client
  res.send(`<h2> Welcome to my express app </h2>`)
})
app.post('/', (req, res) => {
  res.json({message: 'you sent a post request to my home page'})
})
// make a new route that is a GET request to /about
app.get('/about', (req, res) => {
  res.json({message: 'you reached my about page json', status: 200, author: 'toneloke'})
})
// this is custom middleware that run only before my artist URL
app.use((req, res, next) => {
  console.log('You just hit my middlware before artist route')
  next()
})
app.get('/artist/album', (req, res) => {
  res.send('some album')
})
app.get('/artist/:name', (req, res) => {
  console.log(req.params.name)
  let htmlDisplay = `<h3>Artist: ${req.params.name}</h3>`
  res.send(htmlDisplay)
})

app.listen(port, (err) => {
  // displays an error in the terminal
  if (err) {
    console.log('something went wrong with your server', err)
  } else {
    console.log('server is running on port 3000')
  }
})
