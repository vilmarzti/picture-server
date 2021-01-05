const fs = require('fs')
const path = require('path')
const http = require('http')
const Promise = require('bluebird')
const mongoose = require('mongoose')
const mongoOptions = require('../utils/mongoose_options')
const pictureSchema = require('../utils/schema')
const { createSVGWindow } = require('svgdom')


// Constants
const model = "seq2seq" // which model we use
const num_samples = 1000 // how many samples we take from the permutations
const num_interpretations = 10 // how many interpretations we want from the ml system
const port = model == "baseline" ? 8001 : 8002 // the port where the deeplearning model is listenting
const titles_name = model === "baseline" ? "baseline_titles" : "seq2seq_titles"
const svg_path = "./data/SVG" // path to the folder with the svg's
const step_distance = 3 // at every <step_distance> there is a cut
const Picture = mongoose.model('Picture', pictureSchema) // the schema with which find and update models
const concurrency = 100 // number of concurrent server-requests
const window = createSVGWindow()
const document = window.document

// Initialization of SVG-Utilities
const { SVG, registerWindow } = require('@svgdotjs/svg.js')
const { server } = require('karma')
const { title } = require('process')
registerWindow(window, document)

// Functions
// cuts a path into steps with length 
function cut_path_steps(paths) {
    let cut_paths = []
    for (let path of paths) {
        let path_points = []
        let index = 0
        while (index * step_distance < path.length()) {
            path_points.push(path.pointAt(index * step_distance))
            index++
        }
        cut_paths.push(path_points)
    }
    return cut_paths
}

// find all permutations of an array
const permutator = (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}

// Take paths and creates a format that the server expects
function compose_data_format(paths) {
    let text_object = {
        wholeword_segments: "",
        word_ascii: "",
        word_stroke: [],
        num_interpretations: num_interpretations
    }
    for (let path of paths) {
        for (let [index, point] of path.entries()) {
            let type = "move"
            let ev = 0

            if (index === 0) {
                type = "start"
            }

            if (index === path.length - 1) {
                type = "end"
                ev = 1
            }

            let word_stroke = {
                type: type,
                x: point.x,
                y: point.y,
                ev: ev,
                ts: 0
            };

            text_object.word_stroke.push(word_stroke);
        }
    }

    return text_object;
}

// sends the formatted paths to the server
function send_to_server(text_object) {
    let options = {
        hostname: "127.0.0.1",
        port: port,
        path: "/",
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },

    };

    let body_chunks = []
    return new Promise((resolve, reject) => {
        const req = http.request(
            options,
            (res) => {
                res.on('data', (chunk) => {
                    body_chunks.push(chunk)
                })
                res.on('end', () => {
                    let body = Buffer.concat(body_chunks).toString()
                    let body_parsed = JSON.parse(body)
                    resolve(body_parsed)
                })
            }
        )

        req.on('error', (e) => {
            reject(e)
        })

        req.write(JSON.stringify(text_object))
        req.end()
    })
}

// process filename
async function process(file_name, file_path) {
    // read file
    let svg_text = fs.readFileSync(path.join(file_path, file_name), { encoding: 'utf-8' })

    // create canvas
    let draw = SVG(document.documentElement)

    draw.clear()
    let store = draw.svg(svg_text)
    const cut_paths = cut_path_steps(store.find("path"))

    // sort paths by ascending x axis
    cut_paths.sort((a, b) => a[0].x - b[0].x)

    console.log(file_name + " printing " + num_interpretations + " samples")

    // send perm_samples to server and get the interpretations back
    interpretations = await Promise.map(
        [cut_paths],
        (path) => {
            const json_format = compose_data_format(path)
            return send_to_server(json_format)
        },
        {
            concurrency: concurrency
        }
    )

    // get interpretations into an order
    interpretations_list = []
    for(let [interpretation, value] of Object.entries(interpretations[0])){
        interpretations_list.push([interpretation, value])
    }
    interpretations = interpretations_list.sort((a, b) => b[1] - a[1])

    // print out the interpretations
    for(let elem of interpretations){
        console.log(elem[0] + ": " + elem[1])
    }

    // get picture where the filename is included
    const file_basename = file_name.slice(0, -4)
    let picture = await Picture.find(
        {
            "path": {
                "$regex": file_basename + ".png",
                "$options": "i"
            }
        }
    )

    // save the new interpretations in the database
    if(picture.length > 0){
        picture = picture[0]
        // clear previous interpretations
        picture[titles_name] = []
        for(let elem of interpretations){
            picture[titles_name].push({
                "title": elem[0],
                "votes": elem[1]
            })
        }
        await picture.save()
    }
}


// Main execution
async function main() {
    await mongoose.connect(mongoOptions.db_path, mongoOptions.options)
    //console.log('mongoose connected')

    // Check if svg_path exists
    if (fs.realpathSync(svg_path)) {
        // read all the filenames in the given directory
        const files = fs.readdirSync(svg_path)
        files.sort()

        // Go through all files
        for (const geste of files) {
            await process(geste, svg_path)
        }
    }

    await mongoose.disconnect()
}

// execute code
main()