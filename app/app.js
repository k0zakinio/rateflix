const express = require("express");
const http = require('http');
const app = express();

const apiKey = process.env.OMDB_API_KEY;

app.set('port', (process.env.PORT || 8000));

app.get("/title/:title", (req, res) => {
  let title = req.params.title;
  let omdbResponse = omdbFromTitle(title, function(response) {
    res.send(response);  
  });
});

app.listen(app.get('port'), () => {
  console.log("server spun up... listening on port " + app.get('port'));
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


