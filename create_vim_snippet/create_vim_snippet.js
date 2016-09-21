#!/usr/bin/env node
const cp = require('child_process');
const fs = require('fs')
const prompt = require('prompt');
prompt.start();

var supposed_snippets_directory = process.env['HOME'] + "/.vim/bundle/snipmate.vim/snippets/";

function check_if_snippets_directory_exists( directory ) {
	fs.stat( directory, function( err,stats ) {
		if ( err ) {
			exit_with_error("Could not locate snippets directory. Searched at: " + supposed_snippets_directory);
		}
	} );
}
function get_snippet_scope_from_user() {
	var scopes = get_list_of_available_scopes( supposed_snippets_directory );
	console.log( scopes );
	var question = 'Please select a scope';
	prompt.get( question, function (err, result) {
		// check if literal value
		if ( scopes.indexOf( result[question] ) > -1 ) {
			proceed_with_scope( result[question] );
			return;
		}
		// check if int value 
		if ( parseInt( result[question] ) > -1 && scopes[result[question]] ) {
			proceed_with_scope( scopes[result[question]] );
			return;
		}
		console.log( 'Please enter one of the listed scopes by name or index (0-based)' );
		get_snippet_scope_from_user();
	} );
}
function get_list_of_available_scopes() {
	var scopeCandidates = fs.readdirSync( supposed_snippets_directory );	
	var scopes = [];
	// check each item if it is a directory
	scopeCandidates.forEach( function( item ) {
		var path = supposed_snippets_directory + item;
		var stats = fs.statSync( path ); 
		if( stats.isDirectory() ) {
			scopes.push( item );
		}
	} );
	return scopes;
}
function get_snippet_name_from_user() {

}

function let_user_create_snippet_file() {

}
function exit_with_error( error ) {
	error = "ERROR: " + error;
	if ( console.error ) {
		console.error ( error );
	} else {
		console.log( error );
	}
	process.exit(1);
}

function proceed_with_scope( scope ) {
	console.log( scope );
}

// console.log("Creating new vim snippet");
//prompt.get('Please select a scope:', function (err, result) {
//
//});

check_if_snippets_directory_exists( supposed_snippets_directory );
get_snippet_scope_from_user();
get_snippet_name_from_user();
let_user_create_snippet_file();
