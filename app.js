var http = require( 'http' )
var proxiedHttp = require( 'findhit-proxywrap' ).proxy( http )
var express = require( 'express' )
var app = express()
 
// instead of http.createServer(app)
var srv = proxiedHttp.createServer( app ).listen( 8080 )
 
app.get( '/', ( req, res ) => {
    res.send( 'IP = ' + req.connection.remoteAddress + ':' + req.connection.remotePort )
})