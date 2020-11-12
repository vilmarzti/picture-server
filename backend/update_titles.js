con = Mongo()

db = con.getDB('picture-server')

db.pictures.update(
    {},
    {
        $rename: {
            'titles': 'human'
        }
    }
)