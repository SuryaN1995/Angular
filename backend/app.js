const express = require('express')
const process = require('process')
const mongoose = require('./mongoose')
var body_parser = require('body-parser')
const app = express()
const { PostDB } = require('./PostSchema')

app.use(body_parser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    next()
})

app.get('/posts', (req, res) => {
    PostDB.find().then((document) => {
        res.status(200).json({
            message: 'Posts fetched succesfully',
            posts: document
        })
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.delete('/posts:id', (req, res) => {
    console.log(req.params.id)
    PostDB.deleteOne({ _id: req.params.id }).then((result) => {
        console.log(result)
        res.status(200).json({
            message: "Post successfully deleted"
        })
    }).catch((error)=>{
        res.status(400).send(error)
    })
})


app.post('/posts', (req, res) => {
    const post = PostDB({
        title: req.body.title,
        content: req.body.content
    })
    post.save().then((result) => {
        console.log('posted', post)
        res.status(201).json({
            message: 'Post added succesfully',
            postId:result._id
        })
    })
})


app.listen(process.env.PORT || 3000, () => {
    console.log('Started server')
})