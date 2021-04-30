const express = require("express")
const path = require("path")
const bodyParser = require("body-Parser")
const app = express()
const PORT = 27017
const mongoose = require("mongoose")
const Todo = require("./models/todo")
const { toUnicode } = require("punycode")

// console.log("Todo require => ", Todo)
console.log("mongoose model::::::::: <=> ", mongoose.model("TodoModel"))
// console.log(Todo === mongoose.model("TodoModel"))

mongoose.connect("mongodb://localhost:27017/firstmongo")

app.use("/", express.static(path.resolve(__dirname, "assets")))

app.use(bodyParser.json())

app.post("/api/delete", async (req, res) => {
  const { record } = req.body
  console.log(record, "/api/delete")

  const response = await Todo.deleteOne({ record })

  console.log(response, "/api/delete repsonse")

  res.json({ status: "ok" })
})

app.post("/api/modify", async (req, res) => {
  const { old: oldTitle, new: newTitle } = req.body

  const response = await Todo.updateOne(
    {
      record: oldTitle,
    },
    {
      $set: {
        record: newTitle,
      },
    }
  )

  console.log(response)

  res.json({ status: "ok" })
})

app.get("/api/get", async (req, res) => {
  // const records = [{ record: "hello" }, { record: "world" }]
  const records = await Todo.find({ record: "1234" })
  // console.log("response :::::::=> ", records)
  console.log("records ====== ", records)
  res.json(record)
})

app.post("/api/create", async (req, res) => {
  const record = req.body
  console.log(record)

  //create from CRUD -> res from database server
  const response = await Todo.create(record)

  console.log("response :::::::::: => ", response)
  res.json({ status: "ok" })
})

app.listen(PORT, () => {
  console.log("server up")
})
