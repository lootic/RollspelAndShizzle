/**
- It should be possible to create an adventure
- It should be possible to add characters to the adventure
- Remove characters from an adventure

An adventure:
- Should be able to increase time
- Should show time of day
Time should affect and show:
- Burn time of lanterns
- Sunrise and sunset should be affected by this
- Showing hunger meters, being hungry should give a negative for abilites, small
characters should need to eat less.
- Showing thirst meters, being thirsty should give a negative modifier for
abilities.
- Eat
- Drink
- Share items
- Craft
- Start a fight
- Set the environment??
- Turn light on, turn light off

- Should be able to click sleep on some character
- Not sleeping should should give a negative modifier for abilites
*/

let characters = null;
let wind = 0; // affected by temperature changes
let temperature = 0; // affected by cloudiness changes, closeness to water and meters above sea
let downfall = 0; // affected by cloudiness and meters above sea level, the thicker the clouds, the harder the downpour
let cloudiness = 0; //builds up over time, quicker the higher the temperature is
let spillOverSeconds = 0;
let baseTemperature = 10;
let isRaining = false;
let time = new Date();

function randomizeWeatherForAnHour() {
  //there should be a small chance for a weather event, like 1 in 20
  //there should be a small chance of a temperature event, 1 in 100 or so
  let kilometersAboveSeaLevel = parseInt(document.getElementById("height-above-sea-level").value); //higher up means colder, 100m=1C
  let latitude = parseInt(document.getElementById("latitude").value); //-90-+90
  let startOfYear = new Date(time.getFullYear(), 0, 0);

  baseTemperature = Math.random() * 10 / (baseTemperature * 0.95 + 1);
  let dayOfYear = ((((time - startOfYear) / (1000 * 3600 * 24)) / 365) - 0.05) * 2 * Math.PI;

  let previousTemperature = temperature;
  temperature = baseTemperature - Math.floor(kilometersAboveSeaLevel / 100) + 50 - Math.abs(latitude) - 20 * Math.cos(dayOfYear);
  document.getElementById("temperature").textContent = Math.round(temperature);

  wind = (previousTemperature - temperature) * 10;
  document.getElementById("wind").textContent = Math.round(Math.abs(wind));
  if (Math.random() < 0.1) {
    cloudiness += 25 * Math.random() + temperature / 10;
  }
  if (cloudiness > 60 && !isRaining) {
    let chanceForRain = (cloudiness - 60) / 40.0;
    if (Math.random() < chanceForRain) {
      downfall = cloudiness * Math.random();
      isRaining = true;
    }
  } else if (cloudiness < 40 && isRaining) {
    let chanceForClearingUp = 1 / (cloudiness + 1.0);
    if (Math.random() < chanceForClearingUp) {
      isRaining = false;
    }
  }
  if (isRaining) {
    downfall = (downfall + Math.random() * cloudiness) / 2;
    cloudiness -= downfall / 5;
    document.getElementById("downfall").textContent = Math.round(downfall);
  } else {
    document.getElementById("downfall").textContent = 0;
  }
  document.getElementById("cloudiness").textContent = Math.round(cloudiness);
}


function listCharactersForAdventure() {
  listCharactersRest(function(json) {
    characters = json;
  });
}

function addCharacter() {
  let characterTable = document.getElementById('adventure-character-list');
  let row = characterTable.insertRow();
  let cell = row.insertCell();
  let selectNode = document.createElement('select');
  for (let i = 0; i < characters.length; ++i) {
    let textContent = characters[i].name + ' ' + language[characters[i].race] + ' ' + language[characters[i].proficiency];
    let option = document.createElement('option');
    option.value = characters[i].id;
    option.textContent = textContent;
    selectNode.add(option);
  }
  cell.appendChild(selectNode);
}

function addHours() {
  let hours = parseInt(document.getElementById("hours").value);
  for (let i = 0; i < hours; ++i) {
    time.setHours(time.getHours() + 1);
    randomizeWeatherForAnHour();
  }
  document.getElementById("date").textContent = time.toString();
}

function list() {

}

function save() {

}

function load(adventureId) {

}
