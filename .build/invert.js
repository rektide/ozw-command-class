#!/usr/bin/env node
"use strict"

var
  input= [],
  defer= Promise.defer()
process.stdin.on( "data", function( d){
	input.push(d)
})
process.stdin.on( "end", function(){
	var
	  data= JSON.parse( input.join( "")),
	  result= new Array(255)
	for(var i in data){
		result[ data[ i]]= i
	}
	defer.resolve( result)
})

module.exports= defer.promise
if( require.main=== module){
	defer.promise.then(JSON.stringify).then(console.log)
}
