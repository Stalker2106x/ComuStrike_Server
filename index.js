const App = require('./App')

let debug = false
let fillDB = false
process.argv.forEach(function (arg, index, array) {
    if (arg === '--debug' || arg === '-d') debug = true
    if (arg === '--fillDB') fillDB = true
});
const app = new App(debug, fillDB)
app.run()
