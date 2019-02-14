# AutoDetweeter

AutoDetweeter automatically deletes tweets after a set period of time.

## Config
Use process env variables to set the following values:

- `process.env.CONSUMER_KEY`
- `process.env.CONSUMER_SECRET`
- `process.env.ACCESS_TOKEN_KEY`
- `process.env.ACCESS_TOKEN_SECRET`
- `process.env.SCREEN_NAME`
- `process.env.TWITTER_DATE_FORMAT`
- `process.env.DELETE_AFTER`
- `process.env.TIME_UNIT`

## License

AutoDetweeter is Public Domain

## Support

There is no support. This serves my purpose. If it helps you as well, awesome.

## Deploy on Heroku

Best to deploy on [Heroku with a scheduler](https://devcenter.heroku.com/articles/scheduler).

## Twitter Date Format

Currently: `ddd MMM DD hh:mm:ss ZZ YYYY`

Not sure if that will change, but didn't want to push the code again if it does.