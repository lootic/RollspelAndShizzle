var language = null;

function getCharacterRest(characterId, callback) {
  let request = new XMLHttpRequest();
  characterLocationUrl = '/rest/character/' + characterId;
  request.addEventListener("load", function() {
    let json = JSON.parse(this.responseText);
    callback(json);
  });
  request.open("GET", "/rest/character/" + characterId);
  request.send();
}

function updateCharacterRest(characterId, jsonObject) {
  let request = new XMLHttpRequest();
  request.open("PUT", "/rest/character/" + characterId);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify(jsonObject));
}

function listCharactersRest(callback) {
  var request = new XMLHttpRequest();
  request.addEventListener("load", function() {
    let json = JSON.parse(this.responseText);
    callback(json);
  });
  request.open("GET", "/rest/character");
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send();
}

function getLanguageRest(languageName) {
  var request = new XMLHttpRequest();
  request.addEventListener("load", function() {
    language = JSON.parse(this.responseText);
  });
  request.open("GET", "/language/" + languageName);
  request.setRequestHeader("Content-Type", "application/json;");
  request.send();
}
