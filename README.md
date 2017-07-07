# rateflix
Add ratings to netflix pages

![preview](http://i.imgur.com/10M1eKN.png)

## Purpose
I hate going onto netflix and not seeing what ratings things have, so there is a little express server acting as a proxy, speaking to the OMDB API to gather ratings.  Ratings are then injected onto the netflix page via a chrome extension which does a little bit of page scraping

## API Usage (only used by chrome extension)

Title search

*GET*
`/title/:title`


## To run backend locally - you'll need an OMDB API key ($$$)
* `node app/app.js`

## To run install extension
* in the chrome browser go to `chrome://extensions/`
* enable developer mode
* `pack extension` and navigate to the chrome-extension folder
* drag the chrome-extension.crx onto the extension window in chrome
* all done
