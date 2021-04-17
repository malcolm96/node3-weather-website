const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicDir = path.join(__dirname, '../public');
const partialPath = path.join(__dirname,'../templates/partials');

//Set up handle bar engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//setting up static dir
app.use(express.static(publicDir))

app.get('',(req, res) => {
    res.render('index',{
        title:'Weather-app',
        name: 'Arfan M. Rafique'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        name:'Arfan M. Rafique'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help section',
        name:'Arfan M. Rafique'
    })
})


app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error:'Please provide an address'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error:'Provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})


app.get('/help/*', (req, res) => {
    res.render('404',{
        error:'Article not found',
        name: 'Arfan M. Rafique',
        title:'404'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        error:'Page not found',
        name: 'Arfan M. Rafique',
        title:'404'
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
