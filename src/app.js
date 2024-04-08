const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fs = require('fs')


const addData = function (name, need, mobile) {
    const data = loadData();
    data.push({
        name: name,
        need: need,
        mobile: mobile

    });
    console.log("Name: " + name);
    console.log("Need: " + need);
    console.log("Mobile :" + mobile);
    saveData(data);
}

const saveData = function (data) {
    const dataJSON = JSON.stringify(data)
    fs.writeFileSync('data.json', dataJSON)
}

const loadData = function () {
    try {
        const dataBuffer = fs.readFileSync('data.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// app.post('/formPost', (req, res) => {
//     console.log(req.body);
// })

app.use(express.static('template/partials'));



const PORT = process.env.PORT || 3030;


const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
const dataFilePath = path.join(__dirname, 'example.json')

app.post('/submit-form', (req, res) => {
    const formData = req.body;

    // Load existing data from JSON file
    let existingData = [];
    try {
        existingData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    } catch (err) {
        console.error('Error reading file:', err);
    }

    // Add new form data to existing data
    existingData.push(formData);

    // Write updated data back to JSON file
    fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).send('Error submitting form data');
        } else {
            res.status(200).send('Form data submitted successfully');
        }
    });
});

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

app.post('/data', (req, res) => {
    addData(req.body.name, req.body.need, req.body.mobile);
    res.render('data', {
        title: 'NEED IT',
        name: 'Neeraj',
        user: req.body.name,
        userMobile: req.body.mobile

    })
})



app.get('/need', (req, res) => {
    const data = loadData();
    res.render('need', {
        helpText: '',
        title: 'Needs',
        name: 'Neeraj',
        data: data
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Neeraj'
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

