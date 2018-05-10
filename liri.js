require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var require = require('inquirer');
// var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var	twitter = new Twitter(keys.twitter);
var omdbKey = keys.omdb.API_Key



function myTweets(){
	var params = {screen_name: 'RobAce26', count: 20};
	twitter.get(
		'statuses/user_timeline',
		params,
		function(error, tweets, response) {
  		if (error) {
    		console.log(error);
  		}else{
  			tweets.forEach(function(tweet){
	  			var tweetOutput = "Tweet: " + tweet.text + "\n" +
	  				"Published: " + tweet.created_at + "\n";
	  			// console.log(tweetOutput);
	  			logText(tweetOutput);
  			})
  		}
  		// Reenable the start prompt until the user exits the app.
  		start();
	});
}

function chosenSpotify(userSpotInput){
	spotify.search({
		type: 'track',
		query: userSpotInput
	}, function(err, userSpotInput) {
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    }else{
	    	var userSI = userSpotInput.tracks.items[0];
	  		var spotifyOutput = "Artist: " + userSI.artists[0].name + "\n" +
	  			"Song Name: " + userSI.name + "\n" +
	  			"Spot Link: " + userSI.external_urls.spotify + "\n" +
	  			"Album: " + userSI.album.name + "\n";
	  		// console.log(spotifyOutput);
	  		logText(spotifyOutput);			
	    }
	    // Reenable the start prompt until the user exits the app.
	    start();
	});
}



function randomChoice(){
	fs.readFile("random.txt", 'utf8', function(error, data) {		    
		// If the code experiences any errors it will log the error to the console. 
	    if(error) {
	        return console.log(error);
	    }else{
	    	var dataArr = data.split(",");
	    	var userFirstInput = dataArr[0];
	    	var userSecondInput = dataArr[1];

	    	switch(userFirstInput){
	    		case "spotify-this-song":
	    			chosenSpotify(userSecondInput);
	    			break;
	    	}
	    }
	}); 		
}


function start(){
	inquirer.prompt([
		{
			type: "list",
			name: "whatToPick",
			message: "Which one would you like to check out?",
			choices: ["My Twitter", "Spotify", "Movies", "Random", "Exit"] 
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