// require("dotenv").config();
var keys = require('./keys.js');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

console.log('Type my-tweets , spotify-this-song , movie-this , or do-what-it-says to get started!');

var userCommand = process.argv[2];
var secondCommand = process.argv[3];
    for (i=4; i <process.argv.length; i++) {
        secondCommand += '+' + process.argv[i];    
    }

function theSwitch(){
    switch(userCommand){
        case 'my-tweets':
        fetchTweets();
        break;

        case 'spotify-this-song':
        spotifyME();
        break;

        case 'movie-this':
        aMovieForMe();
        break;

        case 'do-what-it-says':
        followTheTextbook();
        break;
    }
};