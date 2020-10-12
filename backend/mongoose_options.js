const pw = require('./password')

module.exports =  {
    user: 'admin',
    pass: pw.admin_pw,
    authSource: "admin",
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
    useFindAndModify: true,
}