const express = require('express')
const app = express()
const mongoose = require('mongoose')
const env = require('dotenv')
const Book = require('./modals/book.modal')
const Author = require('./modals/author.modal')
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

env.config({ path: ".env" })
const uri = process.env.ATLAS_URI
mongoose.connect(uri);
mongoose.connection.once("open", () => {
    console.log("MongoDB conncetion established !!")
})

app.get('/authors', async (req, res) => {
    const data = await Author.find({})
    // console.log(data)
    res.status(200).send(data)
})

app.post('/books', async (req, res) => {
    // console.log(req.body)
    let data = []
    await req.body.bookIds.map(async (id, i) => {
        // console.log(id)
        const d = await Book.findById(id)
        // console.log(d)
        data.push({ ...d })
        if (data.length == req.body.bookIds.length) {

            res.status(200).send([...data])
        }
        // console.log(...data)
    })
    console.log(data)
})

app.listen(4000, () => {
    console.log("Server is running")
})