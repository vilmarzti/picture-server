const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const mongoOptions = require('./mongoose_options')
const pictureSchema = require('./schema')

const Picture = mongoose.model('Picture', pictureSchema)

if (process.argv.length == 3) {
    const new_path = process.argv[2];
    // check if a real path is given
    if (fs.realpathSync(new_path)) {
        // load all files
        let files = fs.readdirSync(new_path);

        // connect ot mongoose and retrieve all pictures
        mongoose.connect(
            mongoOptions.db_path,
            mongoOptions.options
        ).then(() => {
            for(file in files){
                Picture.findOneAndUpdate(
                    {path : }
                )
            }
            Picture.findOneAndUpdate({})
            mongoose.disconnect()
        })
    }
}