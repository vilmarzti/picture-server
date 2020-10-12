// start Mongo
con = Mongo()
// connect to admin
db = con.getDB('admin')

// create an admin user
db.createUser(
  {
    user: "admin",
    pwd: '<myPassword>', // or cleartext password
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)

// create database for picture server
db.getSiblingDB('picture-server')
db.createCollection('pictures')
