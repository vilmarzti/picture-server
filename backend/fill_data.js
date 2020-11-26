const mongoose      = require('mongoose')
const fs            = require('fs')
const pictureSchema = require('./schema')
const mongoOptions  = require('./mongoose_options')
const path          = require('path');


mongoose.connect(mongoOptions.db_path, mongoOptions.options);
console.log('mongoose connected')

const Picture = mongoose.model('Picture', pictureSchema);

const picture_models = []
if(process.argv.length == 4){
    let picture_path = process.argv[2];
    let save_path = process.argv[3]

    if(fs.realpathSync(picture_path)){
        let files = fs.readdirSync(picture_path);

        for(let file of files){
            if(file.slice(-3) === 'png'){
                console.log("found path: " + file);
                const p = new Picture();
                p.path = path.join(save_path, file);
                svg_models.push(p);
            }
        }

    }
    else{
        console.log('please input a correct path');
    }

}else{
    console.log('please supply a data path');
}

num_models = picture_models.length;

function saveAll(){
    var model = picture_models.pop();
    model.save( (err, saved) =>{
        if(err && err.code === 11000){
            console.log("found duplicate: " + err.keyValue.path)
        }else if(err){
            console.log(err);
            throw err;
        }

        if(--num_models){
            if(saved){
                console.log("Saved file: " + saved.path)
            }
            saveAll()
        }else{
            mongoose.connection.close();
            console.log("mongoose disconnected")
        }

    });
}

saveAll();