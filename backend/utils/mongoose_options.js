const pw = require('./password')

module.exports = {
    db_path: 'mongodb://127.0.0.1:27017/picture-server',
    options: {
        user: 'admin',
        pass: pw.admin_pw,
        authSource: "admin",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: true,
        useFindAndModify: true,
    }
}