"use strict"
var
  commandClasses= require( "./commandClasses.json"),
  lookup= require( "./lookup.json")
Object.defineProperty( commandClasses, "lookup", {
	get: function(){
		return function( n){
			return lookup[ n]
		}
	}
})

module.exports= commandClasses
