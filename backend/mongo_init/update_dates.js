con = Mongo()

db = con.getDB("admin")
db.auth("admin")

db = con.getDB("picture-server")

db.pictures.update(
    {},
    {
        $set: {
            "titles.$[].date": new Date()
        }
    },
    {
        upsert: false,
        multi: true
    }
)