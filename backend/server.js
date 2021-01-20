const path = require('path')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const mongoOptions = require('./utils/mongoose_options')
const pictureSchema = require('./utils/schema')
const { body } = require('express-validator');

const port = process.env.port || 8000

const app = express()

app.use(cors())
app.use(bodyParser.json())

const Picture = mongoose.model('Picture', pictureSchema)

// ********************
// Server configuration
// ********************

// make the picture images public
app.use(
    '/image',
    express.static(
        path.join(__dirname, '../data')
    )
)


// Get all Pictures information
app.get('/infoAll', cors(), (req, res) => {
    Picture.find({}, (err, pers) => {
        if (err) {
            res.status(404).send('Error while loading all Pictures')
        } else {
            let persons = pers.map((p) => {
                console.log("Found picture: " + JSON.stringify(p.toJSON()))
                return p.toJSON()
            });
            res.send(persons)
        }

    });
});


// Get Picture information with specific id
app.get('/info/:id', (req, res) => {
    const id = req.params.id
    console.log('Accessed picture with id: ' + id)

    //  check whether the id is a Number
    if (!isNaN(id)) {

        // Try and access the given picture
        Picture.findOne({ 'id': id }, (err, per) => {
            // check for errors
            if (err) {
                res.status(404).send('Picture not found')
            }
            // if no error - send json object
            else {
                if (!per) {
                    res.status(404).send('Picture not found')
                } else {
                    console.log("Found Picture: " + JSON.stringify(per.toJSON()))
                    res.send(per.toJSON())
                }
            }
        })
    }
    else {
        res.status(404).send('not found')
    }

})

// update picture with a specific vote
app.put('/info/:id',
    body('title').trim().stripLow().escape(),
    (req, res) => {
        const id = req.params.id
        console.log('Accessing picture with id: ' + id);
        if (req.body.title) {
            Picture.findOne({ id: id }).then(
                doc => {
                    console.log('Updating Picture')
                    let title = doc.titles.find(t => t.title === req.body.title)
                    if (title && title.title && title.votes) {
                        title.votes += 1
                        title.date = new Date()
                    } else {
                        doc.titles.push({
                            title: req.body.title,
                            votes: 1,
                            date: new Date()
                        })
                    }
                    doc.save();
                    console.log("Saved Picture: " + doc.toString())
                    res.status(200).send(doc.toJSON());
                }
            )

        } else {
            console.log('misformed json: include title');
            res.status(404).send('misformed json');
        }
    })


// connect to Mongoose and start server
mongoose.connect(mongoOptions.db_path, mongoOptions.options).then(() => {
    app.listen(
        port,
        () => {
            console.log(`Express listening on ${port}`)
        }
    )
})