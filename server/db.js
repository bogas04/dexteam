var mysql = require('mysql')
    , async = require('async')

var HOST = 'localhost'
var USER = 'root'
var PASSWORD = ''
var PRODUCTION_DB = 'hackstein'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
    pool: null,
    mode: null,
}

exports.connect = function(mode, done) {
    state.pool = mysql.createPool({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: PRODUCTION_DB
    })

    state.mode = mode
    done()
}

exports.get = function() {
    return state.pool
}