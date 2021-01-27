const fsex = require('fs-extra')
const path = require('path')

fsex.removeSync(path.resolve(__dirname, '../app/schedule/'))
fsex.mkdirSync(path.resolve(__dirname, '../app/schedule/'))

