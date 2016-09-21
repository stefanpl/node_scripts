#!/usr/bin/env node
// this script filters a list of given words for words containing specific letters. 
// E.g.: filter this list for all words containing an e,g,y, and two 's'
const cp = require( "child_process" );
var list_path = process.argv[2];
var filter_letters = process.argv[3];
var output_file = process.argv[4] ? process.argv[4] : "/tmp/filtered_list_script_results_tmp.txt";
var show_results_threshold = 10;
// filter for entries containing the exact number of letters
var exact_number_given = true;
var unique_entries = true;

check_if_all_params_are_given();
filter_the_list();


function error_and_exit  ( error ) {
	error = "ERROR: " + error;
	if ( console.error ) {
		console.error( error );
	} else {
		console.log( error );
	}
	process.exit( 1 );
}

function check_if_all_params_are_given() {
	if ( ! process.argv[2] || ! process.argv[3] ) {
		error_and_exit( "Please provide all params:\nfilter_list_for_letters.js [list_path] [letters to be filtered] [output file]?" );
	}
}

function filter_the_list() {
	var letter_array = construct_letter_array();
	var command = "cat " + list_path ;
	if ( exact_number_given ) {
		var dots = filter_letters.replace(/./g, ".");
		command = command + " | egrep ^" + dots + "$";
	}
	for (var key in letter_array) {
		command = command + " | egrep -i '";
		for ( var counter = 0; counter < letter_array[key]; counter ++ ) {
			command = command + "[^" + key + "]*" + key + "[^" + key + "]*";	
		}
		command = command + "'";
	} ;
	if ( unique_entries ) {
		command = command + " | uniq";
	}
	command = command + " > " + output_file ; 
	cp.execSync( command );
	var number_of_results = cp.execSync( "wc -l < " + output_file ).toString('utf8');
	number_of_results = number_of_results.replace(/\n/, "");
	if ( number_of_results < show_results_threshold ) {
		var results = cp.execSync( "cat " + output_file ).toString('utf8');
		results = results.replace(/$\n/g, "");
		console.log("Results:");
		console.log(results);
	} else {
		console.log("List has been filtered. " + number_of_results + " results in list");
	}
}

// creates an array which mapps letters to the number of their occurence ( 1-n )
function construct_letter_array() {
	var letter_array = [];
	filter_letters.split("").forEach( function( item  ) {
		if ( letter_array[ item ] ) {
			letter_array[ item ] = letter_array[ item  ] + 1;
		} else {
			letter_array[ item ] = 1;
		}	
	}) ;	
	return letter_array;
}
