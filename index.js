const express= require('express')
const  axios = require('axios')
const cheerio = require('cheerio')


const app= express()
const articles = []
var count=0
app.get('/', (req,res) =>{
    res.send("Welcome climate change page.")
})

app.get('/news',(req,res) =>{
    axios.get('https://www.espn.in/')
        .then((res) =>{
            const html = res.data
            const $ = cheerio.load(html)

            $('a',html).each(function (){
                const title= $(this).text()
                const url = $(this).attr('href')
                count=count+1
                articles.push({
                    title,
                    url,
                    count
                })
            })

            console.log(articles)
        }).catch((err) => console.log(err))

})

app.listen(3003, console.log("Server running!"))
