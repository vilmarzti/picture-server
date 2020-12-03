con = Mongo()

db = con.getDB("admin")
db.auth("admin")

db = con.getDB("picture-server")

db.pictures.updateMany(
    {},
    {
        $rename: {
            "titles": "human_titles"
        }
    }, 
)

db.pictures.aggregate( [
    {
        $addFields :{
            "baseline_titles": [],
            "seq2seq_titles": []
        }
    }
])