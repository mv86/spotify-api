var app = function(){
  var url = 'https://api.spotify.com/v1/search?q=christmas&type=album';
  makeRequest(url, requestComplete);
};

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
};

var requestComplete = function() {
  if (this.status !== 200) return;

  var jsonString = this.responseText;
  var albums = JSON.parse(jsonString);
  populateList(albums);
};

var populateList = function(albums) {
  var div = document.getElementById('albums');
  var ul = document.createElement('ul');
  div.appendChild(ul);
  albums.albums.items.forEach(function(album) {
    var listItem = document.createElement('li');
    var a = document.createElement('a');
    a.innerText = album.name;
    a.setAttribute('href', album.external_urls.spotify);
    a.setAttribute('target', "_blank")
    listItem.appendChild(a);
    ul.appendChild(listItem);
  });
};

window.onload = app;