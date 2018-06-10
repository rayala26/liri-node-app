require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var inquirer = require('inquirer');
// var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var	twitter = new Twitter(keys.twitter);
var omdbKey = keys.omdb.API_Key



var myTweets = function(){
	var params = {screen_name: 'RobAce26', count: 20};
	twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
    		// console.log(error);
	  		for (var i = 0; i < tweets.length; i++){
                console.log(`"${tweets[i].text}" created on ${tweets[i].created_at}`);
            }
        }
    });
}

var spotifyThisSong = function(song) {
	spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
		if(err) {
			return console.log("Sorry cannot find song");
		}
		console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
		console.log("Song: " + data.tracks.items[0].album.external_urls.spotify);
		console.log("Album: " + data.tracks.items[0].album.name);
	});
}


function start(){
	inquirer.prompt([
		{
			type: "list",
			name: "whatToPick",
			message: "Which one would you like to check out?",
			choices: ["My Twitter", "Spotify", "Movies", "Exit"] 
		}
	]).then(function(user) {
		if (user.whatToPick == "My Twitter"){
			myTweets();
		}else if (user.whatToPick == "Spotify"){
			inquirer.prompt([
				{
					type: "input",
					name: "songChoice",
					message: "What song would you like to check out?",
				}
			]).then(function(userSpotInput){
				if (userSpotInput.songChoice == ""){
					chosenSpotify("Ace of Base")
				}else{
					chosenSpotify(userSpotInput.songChoice);	
				}
			})
		}else if (user.whatToPick == "Movies"){
			inquirer.prompt([
				{
					type: "input",
					name: "movieChoice",
					message: "What movie would you like to check out?",
				}
			]).then(function(userMovieInput){
				if (userMovieInput.movieChoice == ""){
					chosenMovie("Mr. Nobody")
				}else{
					chosenMovie(userMovieInput.movieChoice);
				}

			})		
		}else if (user.whatToPick == "Random"){
			randomChoice();		
		}else if (user.whatToPick == "Exit"){
			inquirer.prompt([
				{
					type: "confirm",
					name: "exitApp",
					message: "Are you sure you want to leave?",
				}
			]).then(function(leave){
				if (leave.exitApp == true){
					console.log("Bye!");
				}else{
					start();
				}

			})	
		}
	})
}

start();