const express       = require('express')
const cors          = require('cors')
const mongoose      = require('mongoose')
const bodyParser    = require('body-parser')
const pictureSchema = require('./schema')
const mongoOptions  = require('./mongoose_options')

const port = process.env.port || 8000
const db_path = 'mongodb://127.0.0.1:27017/picture-server'

const app = express()

console.log('cors enabled')
app.use(cors());

const Picture = mongoose.model('Picture', pictureSchema)

// ********************
// Server configuration
// ********************

// Get all Pictures
app.get('/pictureAll', (req, res) =>{
    Picture.find({}, (err, pers) =>{
        if(err){
            res.status(404).send('Error while loading all Pictures')
        }else{
            let persons = pers.map((p) => {
                console.log("Found picture: " + JSON.stringify(p.toJSON()))
                return p.toJSON()
            });

            res.send(persons)
        }

    });
});


// Get Picture with specific id
app.get('/picture/:id', cors(), (req, res) => {
    const id = req.params.id
    console.log('Accessed picture with id: ' + id)

    //  check whether the id is a Number
    if(!isNaN(id)){

        // Try and access the given picture
        Picture.findOne({'id': id}, (err, per) =>{
            // check for errors
            if(err){
                res.status(404).send('not found')
            }
            // if no error - send json object
            else{
                console.log("Found Picture: " + JSON.stringify(per.toJSON()))
                res.send(per.toJSON())
            }
        })
    }
    else{
        res.status(404).send('not found')
    }

})


// connect to Mongoose and start server
mongoose.connect(db_path, mongoOptions).then( () =>{
    app.listen(
        port,
        () =>{
            console.log(`Express listening on ${port}`)
       }
    )
})