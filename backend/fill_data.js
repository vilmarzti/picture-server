const mongoose      = require('mongoose');
const fs            = require('fs')
const pw            = require('./password');
const pictureSchema = require('./schema')
const mongoOptions  = require('./mongoose_options')
const path          = require('path');


db_path = 'mongodb://127.0.0.1:27017/picture-server';

mongoose.connect(db_path, mongoOptions);
console.log('mongoose connected')

const Picture = mongoose.model('Picture', pictureSchema);

const svg_models = []
if(process.argv.length == 3){
    let svg_path = process.argv[2];

    if(fs.realpathSync(svg_path)){
        let files = fs.readdirSync(svg_path);

        for(let file of files){
            if(file.slice(-3) === 'svg'){
                console.log("found path: " + file);
                const p = new Picture();
                p.path = path.join(svg_path, file);
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

num_models = svg_models.length;

function saveAll(){
    var model = svg_models.pop();
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




//mongoose.connection.close()
//console.log('mongoose closed')