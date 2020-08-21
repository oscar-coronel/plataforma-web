const config = {

    dbUrl: process.env.DB_URL || 'mongodb+srv://ocoronel:lGPH5WgGxY4BvZ5s@cluster0.0sp2y.gcp.mongodb.net/ups?retryWrites=true&w=majority',
    port: process.env.PORT || 4000,
    host: process.env.POST || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROOT || '/',
    filesRoute: process.env.FILES_ROUTE || 'files'

}

module.exports = config