#!/usr/bin/env node
"use strict"
var byline= require( "byline")

var prefix= "COMMAND_CLASS_".length
function camel(n){
	n= n.substring( prefix)
	return n.split("_").reduce(function(accum, val, i){
		if( i<= 0){
			accum.push( val.toLowerCase())
		}else{
			accum.push( val.substring(0, 1).toUpperCase())
			accum.push( val.substring(1).toLowerCase())
		}
		return accum
	}, []).join("")
}

var
  commandClasses= {},
  defer= Promise.defer(),
  stream= byline( process.stdin),
  match= /^(\w+)\s+0x\w\w\s+(\d+)$/

stream.on( "data", function( line){
	var
	  matched= match.exec( line),
	  name= camel( matched[ 1]),
	  val= Number.parseInt( matched[2])
	commandClasses[ name]= val
})
stream.on( "end", defer.resolve.bind(defer, commandClasses))

module.exports= defer.promise

if( require.main=== module){
	defer.promise.then(JSON.stringify).then(console.log)
}
