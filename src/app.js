const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fs = require('fs')


const app = express()

const PORT = process.env.PORT || 3030; 

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
const dataFilePath = path.join(__dirname, 'data', 'example.json')  

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))
app.get('/', (req, res) => {
    res.render('index', {
        title: 'NEED IT',
        name: 'Neeraj'
        
    })
})



app.get('/requirement', (req, res) => {
    res.render('requirement', {
        helpText: '',
        title: 'Requirement',
        name: 'Neeraj'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name:'Neeraj'
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neeraj',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neeraj',
        errorMessage: 'Page not found.'
    })
})

