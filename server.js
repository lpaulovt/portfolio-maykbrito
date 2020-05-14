const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const data = require('./data.json')

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){

    return res.render("about", {about: data.about})
})

server.get("/portfolio", function(req, res){
    return res.render("portfolio", {items : data.videos})
})

server.get("/video", function(req, res){
    const id = req.query.id
    const video = data.videos.find(function(video){
        if (video.id == id) {
            return true
        }
    })

    if (!video){
        return res.send("Video not found!")
    }

    return res.render("video", {item: video})
})

server.listen(5000, function(){
    console.log("Server is running")
})