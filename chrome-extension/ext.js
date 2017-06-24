var titleCards = [];

setInterval(() => {
  var cards = document.querySelectorAll(".title_card");
  cards.forEach(c => {
    var t = c.getAttribute("aria-label");
    if(t != null) titleCards.push(c);
  });
  titleCards.forEach(elem => addDelayListener(elem)); 
}, 1000);

function addDelayListener(elem) {
  if(elem.getAttribute('has-listener') !== null) return;
  var timeout = null;
  function setListener(e) {
    timeout = setTimeout(() => omdbRequest(e.toElement, successCallback, failureCallback), 1000);
  };

  elem.addEventListener('mouseenter', setListener);
  elem.addEventListener('mouseleave', () => clearTimeout(timeout));
  elem.setAttribute('has-listener', true);
}

function omdbRequest(elem, success, failure) {
  var title = elem.getAttribute("aria-label");
  var url = "https://lit-headland-12280.herokuapp.com/title/" + encodeURIComponent(title);
  var xml = new XMLHttpRequest();
  xml.onreadystatechange = function () {
    if (xml.readyState === 4 && xml.status == 200) {
      success(JSON.parse(xml.responseText), elem);
    } else if (xml.readyState === 4 && xml.status != 200) {
      failure(xml.status);
    }
  };
  xml.open("GET", url, true);
  xml.send();
}


function successCallback(json, elem) {
  elem.querySelector('.meta').innerHTML += "<span class='duration'>IMDB:" + json.imdbRating + "</span>";
};

function failureCallback(statusCode) {
  console.log("something went wrong... status code " + statusCode + " from omdb request");
};
