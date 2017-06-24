var cards = document.querySelectorAll(".title_card");
var titleCards = [];
cards.forEach(c => {
  var t = c.getAttribute("aria-label");
  if(t != null) titleCards.push(c);
});

titleCards.forEach(elem => {
  addDelayListener(elem); 
});

function addDelayListener(elem) {
  var timeout = null;
  elem.addEventListener('mouseenter', (e) => timeout = setTimeout(() => omdbRequest(e.toElement.getAttribute("aria-label"), successCallback, failureCallback), 1000));
  elem.addEventListener('mouseleave', () => clearTimeout(timeout));
}

function omdbRequest(title, success, failure) {
  var url = "https://lit-headland-12280.herokuapp.com/title/" + encodeURIComponent(title);
  var xml = new XMLHttpRequest();
  xml.onreadystatechange = function () {
    if (xml.readyState === 4 && xml.status == 200) {
      success(JSON.parse(xml.responseText));
    } else if (xml.readyState === 4 && xml.status != 200) {
      failure(xml.status);
    }
  };
  xml.open("GET", url, true);
  xml.send();
}


function successCallback(json) {
  alert("imdb rating of " + json.Title + " is: " + json.imdbRating);
};

function failureCallback(statusCode) {
  console.log("something went wrong... status code " + statusCode + " from omdb request");
};
