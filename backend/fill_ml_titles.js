const fs = require('fs')
const path = require('path')
const http = require('http')
const mongoose = require('mongoose')
const mongoOptions = require('./mongoose_options')
const pictureSchema = require('./schema')
const { createSVGWindow } = require('svgdom')


// Constants
const port = 8001 // the port where the deeplearning model is listenting
const svg_path = "./data/SVG" // path to the folder with the svg's
const step_distance = 3 // at every <step_distance> there is a cut
const Picture = mongoose.model('Picture', pictureSchema) // the schema with which find and update models
const window = createSVGWindow()
const document = window.document

// Initialization of SVG-Utilities
const { SVG, registerWindow } = require('@svgdotjs/svg.js')
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
function perm(xs) {
    let ret = []

    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)))

        if (!rest.length) {
            ret.push([xs[i]])
        } else {
            for (let j = 0; j < rest.length; j = j + 1) {
                ret.push([xs[i]].concat(rest[j]))
            }
        }
    }
    return ret
}

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
        word_stroke: []
    }
    for (let path of paths) {
        for (let [index, point] of path.entries()) {
            let type = "move"
            let ev = 0

            if (index === 0) {
                type = "start"
            }

            if (index === path.length) {
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
async function send_to_server(text_object, interpretations) {
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
    const req = http.request(
        options,
        (res) => {
            res.on('data', (chunk) => {
                body_chunks.push(chunk)
            });
            res.on('end', () => {
                let body = Buffer.concat(body_chunks).toString()
                interpretations.push(body)
                console.log(" " + JSON.parse(body).result)
            })
        }
    )

    req.on('error', (e) => {
        console.log(e.message)
    });

    req.write(JSON.stringify(text_object))
    req.end()
}

// process filename
async function process(file_name, file_path) {
    // read file
    let svg_text = fs.readFileSync(path.join(file_path, file_name), { encoding: 'utf-8' })

    // create canvas
    let draw = SVG(document.documentElement)

    // draw SVG
    let store = draw.svg(svg_text)
    const cut_paths = cut_path_steps(store.find("path"))

    // get permutations of paths
    //const permutations = permutator(cut_paths)

    let interpretations = [];
    const json_format = compose_data_format(cut_paths);
    send_to_server(json_format, interpretations);

    // get the new titles
    /*
    let interpretations = []
    let bool = true;
    for (const path of permutations) {
        const json_format = compose_data_format(path)
        setTimeout(
            () => {
                send_to_server(json_format, interpretations)
            },
            10
        )
    }
    */




    // get picture where the filename is included
    const file_basename = file_name.slice(0, -4)
    const picture = await Picture.find(
        {
            "path": {
                "$regex": file_basename,
                "$options": "i"
            }
        }
    )
}


// Main execution
async function main() {
    mongoose.connect(mongoOptions.db_path, mongoOptions.options)
    console.log('mongoose connected')

    // Check if svg_path exists
    if (fs.realpathSync(svg_path)) {
        // read all the filenames in the given directory
        const files = fs.readdirSync(svg_path)

        // Go through all files
        for (const geste of files) {
            process(geste, svg_path)
        }
    }
}

// execute code
main()