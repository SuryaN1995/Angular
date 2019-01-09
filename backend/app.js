const express = require('express')
const process = require('process')
var body_parser = require('body-parser')
const app = express()
const { PostDB } = require('./PostSchema')

app.use(body_parser.json())

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
})

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    next()
})

app.get('/posts', async (req, res) => {
    try {
        let post = await PostDB.find()
        res.status(200).json({
            message: 'Posts fetched succesfully',
            posts: post
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.delete('/posts:id', async (req, res) => {

    try {
        console.log(req.params.id)
        var result = await PostDB.deleteOne({ _id: req.params.id })
        console.log(result)
        res.status(200).json({
            message: "Post successfully deleted"
        })
    } catch (error) {
        res.status(400).send(error)
    }

})

app.patch('/posts:id', async (req, res) => {
    try {
        console.log('getData')
        const post = new PostDB({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content
        })
        console.log('getData', post)
        let result = await PostDB.updateOne({ _id: req.params.id }, post)
        console.log(result)
        res.status(200).json({
            message: "Post updated succesfully"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})


app.post('/posts', async (req, res) => {
    try {
        const post = PostDB({
            title: req.body.title,
            content: req.body.content
        })
        let result = await post.save()
        console.log('posted', post)
        res.status(201).json({
            message: 'Post added succesfully',
            postId: result._id
        })
    } catch (error) {
        res.status(400).send(erro)
    }
})


app.listen(process.env.PORT || 3000, () => {
    console.log('Started server')
})