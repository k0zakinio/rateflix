# rateflix
Add ratings to netflix pages

![preview](http://i.imgur.com/dQfQhQQ.png)

## Purpose
I hate going onto netflix and not seeing what ratings things have, so there is a little express server acting as a proxy, speaking to the OMDB API to gather ratings.  Ratings are then injected onto the netflix page via a chrome extension which does a little bit of page scraping

## API Usage (only used by chrome extension)

Title search

*GET*
`/title/:title`
