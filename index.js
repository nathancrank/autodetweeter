const Twitter = require('twitter');
const moment = require('moment');


const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const config = {
	screen_name: process.env.SCREEN_NAME,
	twitterDateFormat: process.env.TWITTER_DATE_FORMAT,
	deleteAfter: process.env.DELETE_AFTER,
	timeUnit: process.env.TIME_UNIT
};



getTimeline();



function getTimeline() {
	client.get(
		'statuses/user_timeline',
		{ screen_name: config.screen_name },
		( error, tweets, response ) => {
		  if ( !error ) {
		    processTweets( tweets );
		  }
		}
	);
}

function processTweets( tweets ) {
	let cutOffDate = moment().subtract( config.deleteAfter, config.timeUnit );
	for ( let tweet of tweets) {
		let createdAt = moment( tweet.created_at, config.twitterDateFormat );
		if ( createdAt.isBefore( cutOffDate ) ) {
			deleteTweet(tweet);
		}
	}
}

function deleteTweet( tweet ) {
	client.post(
		'statuses/destroy/' + tweet.id_str + '.json',
		{ id: tweet.id_str },
		( error, tweets, response ) => {
			// do nothing
		}
	);
}