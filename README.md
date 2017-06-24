# rateflix
Add ratings to netflix pages

![preview](http://i.imgur.com/VbSZGjC.png)

## Purpose
I hate going onto netflix and not seeing what ratings things have, so there is a little express server speaking to the OMDB API to gather ratings, then inject the ratings onto the netflix page via a chrome extension which does a little bit of page scraping

## Usage

Title search

*GET*
`/title/:title`
