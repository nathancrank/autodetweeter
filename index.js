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
	console.log( 'Getting timeline ...' );
	client.get(
		'statuses/user_timeline',
		{
			screen_name: config.screen_name,
			exclude_replies: false,
			include_rts: true,
			count: 200
		},
		( error, tweets, response ) => {
		  if ( !error ) {
		  	console.log( 'Timeline retrieved.' );
		    processTweets( tweets );
		  }
		}
	);
}

function processTweets( tweets ) {
	console.log( 'Processing tweets ...' );
	let cutOffDate = moment().subtract( config.deleteAfter, config.timeUnit );
	for ( let tweet of tweets) {
		console.log( 'Processing tweet ' + tweet.id_str + '.' )
		let createdAt = moment( tweet.created_at, config.twitterDateFormat );
		if ( createdAt.isBefore( cutOffDate ) ) {
			deleteTweet(tweet);
		}
	}
	process.exit()
}

async function deleteTweet( tweet ) {
	console.log( 'Deleting tweet ' + tweet.id_str );		
	await client.post(
		'statuses/destroy/' + tweet.id_str,
		{ id: tweet.id_str },
		( error, tweets, response ) => {
			console.log( error, tweets, response )
			if ( !error ) {
				console.log( 'Deleted tweet ' + tweet.id_str );
			}
		}
	);
}