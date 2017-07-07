const express = require("express");
const http = require('http');
const app = express();

const apiKey = process.env.OMDB_API_KEY;

app.set('port', (process.env.PORT || 8080));

app.get("/title/:title", (req, res) => {
  let title = req.params.title;
  omdbFromTitle(title, (response) => {
    res.send(response);
  });
});

app.listen(app.get('port'), () => {
  console.log("server spun up... listening on port " + app.get('port'));
});


function omdbFromTitle(title, callback) {
  let url = 'http://www.omdbapi.com/?t=' + encodeURIComponent(title) + '&apikey=' + apiKey;
  console.log(url);
  return http.get(url, (response) => {
    let body = '';
    response.on('data', (d) => {
      body += d;
    });
    response.on('end', () => {
      console.log(body);
      const parsed = JSON.parse(body);
      const transformed = addImgLinks(parsed);
      callback(transformed);
    });
  });
}


function addImgLinks(json) {
  if (json["Ratings"] !== null) {
    json["Ratings"].forEach(sourceAndValue => {
      switch(sourceAndValue["Source"]) {
        case "Internet Movie Database": sourceAndValue["img"] = "https://www.andydowell.co.uk/images/imdb.png"; break;
        case "Rotten Tomatoes": sourceAndValue["img"] = "https://www.andydowell.co.uk/images/rottentomatoes.png"; break;
        case "Metacritic": sourceAndValue["img"] = "https://www.andydowell.co.uk/images/metacritic.png"; break;
      }
    });
  }

  return json;
}


