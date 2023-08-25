const App = require('./App')

let debug = false
let fillDB = false
let forceLocalhost = false
process.argv.forEach(function (arg, index, array) {
    if (arg === '--debug' || arg === '-d') debug = true
    if (arg === '--fillDB') fillDB = true
    if (arg === '--forceLocalhost') forceLocalhost = true
});
const app = new App(debug, fillDB, forceLocalhost)
app.run()
