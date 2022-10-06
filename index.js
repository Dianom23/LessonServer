const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const Contacts = require('./contacts-model')
require('dotenv').config()

const app = express()
const PORT = 3000
const db = process.env.DB


const createPath = page =>{
    return path.resolve(__dirname, 'public', page + '.html')
}


const start = async() =>{
    try{
        await mongoose.connect(db)
            .then(res => console.log('База данных подключена'))
            .catch(error => console.log(error))
        app.listen(process.env.PORT || PORT, ()=>{
            console.log('Сервер запустился')
        })
    }
    catch(error){
        console.log(error)
    }
}
start()


app.set('view engine', 'pug')

app.set('views', './views')

app.use(express.urlencoded({extended:false}))

app.use(express.json())



app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) =>{
    res.render('home')
})
app.get('/contact', (req, res) =>{
   
    Contacts
        .find()
        .then(contacts =>{
            for(let i = 0; i < contacts.length; i++){
                console.log(`name : ${contacts[i].name} age : ${contacts[i].age} desc : ${contacts[i].desc}`)
            }
            res.render('contact', {
                contacts: contacts
            })
        })
})

app.get('/add-contact', (req, res)=>{
    res.render('add-contact')
})


app.post('/add-contact', (req,res)=>{
    const {name, age, desc} = req.body
    console.log(name, age, desc)
    const contacts = new Contacts({name, age, desc})
    contacts.save().then(result =>{
       res.redirect('/contact')
    })
})


app.get('/about-us', (req, res)=>{
    res.redirect('/contact')
})


app.use((req, res)=>{
    res.status(404).sendFile(createPath('error'))
})