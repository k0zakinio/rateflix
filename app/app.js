const express = require("express");
const http = require('http');
const app = express();

const apiKey = process.env.OMDB_API_KEY;

app.get("/title/:title", (req, res) => {
  let title = req.params.title;
  let omdbResponse = omdbFromTitle(title, function(response) {
    res.send(response);  
  });
});

app.listen(8000, () => {
  console.log("server spun up... listening on port 8000");
});


function omdbFromTitle(title, callback) {
  let url = 'http://www.omdbapi.com/?t=' + encodeURIComponent(title) + '&apikey=' + apiKey; 
  console.log(url);
  return http.get(url, function(response) {
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      console.log(body);
      var parsed = JSON.parse(body);
      callback(parsed);
    });
  });
};


