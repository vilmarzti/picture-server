const express       = require('express')
const cors          = require('cors')
const mongoose      = require('mongoose')
const bodyParser    = require('body-parser')
const pictureSchema = require('./schema')
const mongoOptions  = require('./mongoose_options')

const hostname = '127.0.0.1'
const port = process.env.port || 8000

db_path = 'mongodb://127.0.0.1:27017/picture-server'

const app = express()
//    .use(cors)

const Picture = mongoose.model('Picture', pictureSchema)

app.get('/vote/:id', (req, res) => {
    const id = req.params.id
    console.log('Accessed vot for id: ' + id);

    //  check whether the id is a Number
    if(!isNaN(id)){

        // Try and access the given picture
        Picture.findOne({'id': id}, (err, per) =>{
            // check for errors
            if(err){
                res.status(404).send('not found');
            }
            // if no error - send json object
            else{
                console.log("Found Person: " + JSON.stringify(per.toJSON()))
                res.send(per.toJSON())
            }
        })
    }
    else{
        res.status(404).send('not found')
    }

})

mongoose.connect(db_path, mongoOptions).then( () =>{
    app.listen(
        port,
        () =>{
            console.log(`Express listening on ${port}`)
       }
    )
})