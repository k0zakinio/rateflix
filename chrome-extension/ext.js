
setInterval(() => {
  var titleCards = [];
  var cards = document.querySelectorAll(".title_card");
  cards.forEach(c => {
    var t = c.getAttribute("aria-label");
    if(t != null) titleCards.push(c);
  });
  titleCards.forEach(elem => addDelayListener(elem)); 
}, 1000);

function addDelayListener(elem) {
  if(elem.getAttribute('has-listener') !== null) {
    return;
  };
  var timeout = null;
  function setListener(e) {
    timeout = setTimeout(() => omdbRequest(e.toElement, successCallback, failureCallback), 500);
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
  var meta = elem.querySelector('.meta');
  if(meta !== null && meta.querySelector('.duration[data="rating"]') == null) {
    meta.innerHTML += "<span class='duration' data='rating'>IMDB:" + json.imdbRating + "</span>";
  } else {
    console.log("ERROR: not adding html as there should already be html");
  }
};

function failureCallback(statusCode) {
  console.log("something went wrong... status code " + statusCode + " from omdb request");
};
