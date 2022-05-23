const express = require("express")

const routes = require('./routes')

require('./database')

const app = express()
const port = 3000

const a = "$2b$10$w6ewrI..w0vq55VSb2r3leC9R76vy16ESg1OhTLU/clBFj80/CglW"

app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})