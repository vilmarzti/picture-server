const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const mongoOptions = require('./mongoose_options')
const pictureSchema = require('./schema')

const Picture = mongoose.model('Picture', pictureSchema)

async function updatePaths(new_path) {
    let pictures = await Picture.find();
    for (let picture of pictures) {
        let basename = path.basename(picture.path)
        picture.path = path.join(new_path, basename)
        await picture.save()
    }
    mongoose.disconnect()
}

if (process.argv.length == 3) {
    const new_path = process.argv[2];
    // update all pictures
    mongoose.connect(
        mongoOptions.db_path,
        mongoOptions.options
    ).then(() => {
        updatePaths(new_path)
    })
}