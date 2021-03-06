// TODO
// - free ability points should automatically show up somehow
// - extra ability points

// validation
// - validate ability values(should not be bigger than base stat)
// - validate spent money isnt bigger than
// - validate that attacks and parries doesn't add up to more than the total
//   fightingCapacity
// - validate that the amount of used abilityPoints doesn't add up to more than
//   the amount of ability points available
// - make it possible to set level

// - infer values into all fields from a json document

// - do something smart about money management

// - add spell/prayer
// - craete more sophisticated dropdowns which shows more information in table form
// - add a volume system, where some items grant volume and others use it up

let previousRace = null;
let previousAge = null;
let characterLocationUrl = null;

function listCharacters() {
  let characterList = document.getElementById('character-list-content');
  characterList.innerHTML = '';
  listCharactersRest(function(json) {
    for (let i = 0; i < json.length; ++i) {
      let characterCard = document.createElement("div");
      characterCard.classList.add("character");
      characterCard.characterId = json[i].id;
      characterCard.onclick = function() {
        open(characterCard.characterId);
        navigateTo('character');
      };
      let nameElement = document.createElement("div");
      nameElement.textContent = json[i].name;
      let sexElement = document.createElement("div");
      sexElement.textContent = json[i].sex;
      let idElement = document.createElement("div");
      idElement.textContent = json[i].id;
      let raceElement = document.createElement("div");
      raceElement.textContent = json[i].race;
      let proficiencyElement = document.createElement("div");
      proficiencyElement.textContent = json[i].proficiency;

      characterCard.appendChild(nameElement);
      characterCard.appendChild(idElement);
      characterCard.appendChild(sexElement);
      characterCard.appendChild(raceElement);
      characterCard.appendChild(proficiencyElement);
      characterList.appendChild(characterCard);
    }
  });
}

function exportArmour() {
  return {
    "head": document.getElementById("head-armour").value,
    "leftArm": document.getElementById("left-arm-armour").value,
    "rightArm": document.getElementById("right-arm-armour").value,
    "torso": document.getElementById("torso-armour").value,
    "stomach": document.getElementById("stomach-armour").value,
    "leftLeg": document.getElementById("left-leg-armour").value,
    "rightLeg": document.getElementById("right-leg-armour").value
  }
}

function save() {
  let attacksAndParries = getAttacksAndParries();
  let abilities = exportAbilities();
  let items = exportItems();
  let weapons = exportWeapons();
  let request = new XMLHttpRequest();

  if (characterLocationUrl == null) {
    request.open("POST", "/rest/character");

    request.onload = function() {
      characterLocationUrl = request.getResponseHeader("Location");
    };
  } else {
    request.open("PUT", characterLocationUrl);
  }
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify({
    "name": getValue("name"),
    "age": getValue("age", 0),
    "race": previousRace,
    "sex": getValue("sex"),
    "level": getValue("level"),
    "mainHand": getValue("main-hand"),
    "proficiency": getValue("proficiency"),
    "strength": getValue("strength", 0),
    "physicality": getValue("physicality", 0),
    "dexterity": getValue("dexterity", 0),
    "size": getValue("size", 0),
    "psyche": getValue("psyche", 0),
    "intelligence": getValue("intelligence", 0),
    "spirituality": getValue("spirituality", 0),
    "charisma": getValue("charisma", 0),
    "money": characterLocationUrl == null ? getValue("money", 0) - getValue("spent", 0) : getValue("money", 0),
    "extraFightingCapacity": getValue("extra-fighting-capacity", 0),
    "extraHitPoints": getValue("extra-hit-points", 0),
    "attacks": attacksAndParries.attacks,
    "parries": attacksAndParries.parries,
    "items": items,
    "weapons": weapons,
    "abilities": abilities,
    "armour": exportArmour()
  }, null, 4));
}

function navigateTo(id) {
  elementIds = ['character', 'character-list', 'adventure', 'adventure-list'];
  for (let i = 0; i < elementIds.length; ++i) {
    let elementId = elementIds[i];
    let element = document.getElementById(elementId);
    if (elementId == id) {
      element.style.display = 'inline-block';
    } else {
      element.style.display = 'none';
    }
  }
}

function open(characterId) {
  getCharacterRest(characterId, function(json) {
    loadAbilities(json["abilities"]);
    loadItems(json["items"]);
    setValue("name", json["name"]);
    setValue("age", json["age"]);
    setValue("race", json["race"]);
    setValue("sex", json["sex"]);
    setValue("main-hand", json["mainHand"]);
    setValue("size", json["size"]);
    setValue("proficiency", json["proficiency"]);
    setValue("strength", json["strength"]);
    setValue("physicality", json["physicality"]);
    setValue("dexterity", json["dexterity"]);
    setValue("intelligence", json["intelligence"]);
    setValue("spirituality", json["spirituality"]);
    setValue("charisma", json["charisma"]);
    setValue("money", json["money"]);
    setValue("extra-fighting-capacity", json["extraFightingCapacity"]);
    setValue("extra-hit-points", json["extraHitPoints"]);
    setValue("level", json["level"]);
    attacksAndParries();
    loadAttacksAndParries(json["attacks"], json["parries"]);
    loadWeapons(json["weapons"]);
    loadArmour(json["armour"]);
    recalc();
  });
}

function loadAbilities(abilities) {
  let abilitiesElement = document.getElementById("abilities");
  let numberOfRows = abilitiesElement.rows.length;
  for (let i = 1; i < numberOfRows; ++i) {
    abilitiesElement.deleteRow(1);
  }
  for (let i = 0; i < abilities.length; ++i) {
    let ability = addAbility();
    ability.selectNode.value = abilities[i].name;
    ability.value.value = abilities[i].value;
  }
}

function loadItems(items) {
  let itemsElement = document.getElementById("items");

  let numberOfRows = itemsElement.rows.length;
  for (let i = 1; i < numberOfRows; ++i) {
    itemsElement.deleteRow(1);
  }
  for (let i = 0; i < items.length; ++i) {
    let item = addItem();
    item.selectNode.value = items[i].name;
    item.value.value = items[i].value;
  }
}

function loadAttacksAndParries(attacks, parries) {
  let attacksAndParriesElement = document.getElementById("attacks-and-parries");
  for (let i = 1; i < attacksAndParriesElement.rows.length; ++i) {
    let attackColumn = attacksAndParriesElement.rows[i].cells[0].childNodes[0];
    if (attackColumn) {
      attackColumn.value = attacks[i - 1];
    }
    let parriesColumn = attacksAndParriesElement.rows[i].cells[1].childNodes[0];
    if (parriesColumn) {
      parriesColumn.value = parries[i - 1];
    }
  }
}

function loadArmour(armour) {
  document.getElementById("head-armour").value = armour["head"];
  document.getElementById("left-arm-armour").value = armour["leftArm"];
  document.getElementById("right-arm-armour").value = armour["rightArm"];
  document.getElementById("torso-armour").value = armour["torso"];
  document.getElementById("stomach-armour").value = armour["stomach"];
  document.getElementById("left-leg-armour").value = armour["leftLeg"];
  document.getElementById("left-leg-armour").value = armour["rightLeg"];
}

function loadWeapons(weapons) {
  let weaponsElement = document.getElementById("weapons");
  let numberOfRows = weaponsElement.rows.length;
  for (let i = 1; i < numberOfRows; ++i) {
    weaponsElement.deleteRow(1);
  }
  for (let i = 0; i < weapons.length; ++i) {
    addWeapon().value = weapons[i].name;
  }
}

function setValue(elementId, value) {
  document.getElementById(elementId).value = value;
}

function exportItems() {
  let items = document.getElementById("items");
  let exportData = [];

  for (let i = 1; i < items.rows.length; ++i) {
    let itemName = items.rows[i].cells[0].childNodes[0].value;
    let itemValue = parseInt(items.rows[i].cells[1].childNodes[0].value);
    if (!itemValue) {
      itemValue = 0;
    }
    exportData.push({
      "name": itemName,
      "value": itemValue
    });
  }
  return exportData;
}

function exportWeapons() {
  let weapons = document.getElementById("weapons");
  let exportData = [];

  for (let i = 1; i < weapons.rows.length; ++i) {
    let weaponName = weapons.rows[i].cells[0].childNodes[0].value;
    exportData.push({
      "name": weaponName
    });
  }
  return exportData;

}

function exportAbilities() {
  let abilities = document.getElementById("abilities");
  let exportData = [];

  for (let i = 1; i < abilities.rows.length; ++i) {
    let abilityName = abilities.rows[i].cells[0].childNodes[0].value;
    let abilityValue = parseInt(abilities.rows[i].cells[1].childNodes[0].value);
    exportData.push({
      "name": abilityName,
      "value": abilityValue
    });
  }
  return exportData;
}

function getValue(element) {
  return getValue(element, null);
}


function getValue(element, defaultValue) {
  let value = document.getElementById(element).value;
  try {
    let integerValue = parseInt(value);
    if (integerValue) {
      return integerValue;
    }
  } catch (err) {}
  if (!value && defaultValue != null) {
    return defaultValue;
  } else {
    return value;
  }
}


function changeRaces() {
  let race = document.getElementById("race").value;
  document.getElementById("age").value = rollAgeForRace(previousAge, race);
  updateStatForRace(race, "strength");
  updateStatForRace(race, "physicality");
  updateStatForRace(race, "dexterity");
  updateStatForRace(race, "size");
  updateStatForRace(race, "intelligence");
  updateStatForRace(race, "psyche");
  updateStatForRace(race, "spirituality");
  updateStatForRace(race, "charisma");
  previousRace = race;
}

function changeAge() {
  let race = document.getElementById("race").value;
  let age = reverseAgeLookup(race, parseInt(document.getElementById("age").value));

  if (!age) {
    return;
  }

  updateStatForAge(age, "strength");
  updateStatForAge(age, "physicality");
  updateStatForAge(age, "dexterity");
  updateStatForAge(age, "size");
  updateStatForAge(age, "intelligence");
  updateStatForAge(age, "psyche");
  updateStatForAge(age, "spirituality");
  updateStatForAge(age, "charisma");

  previousAge = age;
}

function reverseAgeLookup(race, age) {
  let table = raceLookupTable[race].age;
  for (let key in table) {
    if (age >= table[key].from && age <= table[key].to) {
      return key
    }
  }
}

function updateStatForAge(age, stat) {
  let statElement = document.getElementById(stat);
  statElement.value = parseInt(statElement.value) - ageStatModifier(previousAge, stat) + ageStatModifier(age, stat);
}

function updateStatForRace(race, stat) {
  let statElement = document.getElementById(stat);
  statElement.value = parseInt(statElement.value) - raceStatModifier(previousRace, stat) + raceStatModifier(race, stat);
}

function raceStatModifier(race, stat) {
  if (race === 'elven') {
    return elvenRaceStatModifier(stat);
  } else if (race === 'human') {
    return humanRaceStatModifier(stat);
  } else if (race === 'dwarf') {
    return dwarfRaceStatModifier(stat);
  } else if (race === 'hobbit') {
    return hobbitRaceStatModifier(stat);
  } else if (race === 'half-elven') {
    return halfElvenRaceStatModifier(stat);
  } else if (race === 'half-troll') {
    return halfTrollRaceStatModifier(stat);
  }
}

function humanRaceStatModifier(stat) {
  if (stat === 'size') {
    return 6;
  } else {
    return 0;
  }
}

function elvenRaceStatModifier(stat) {
  if (stat === 'size') {
    return 4;
  } else if (stat === "strength") {
    return -1;
  } else if (stat === "dexterity") {
    return 1;
  } else if (stat === "spirituality") {
    return 1;
  } else if (stat === "charisma") {
    return 1;
  } else {
    return 0;
  }
}

function dwarfRaceStatModifier(stat) {
  if (stat === 'size') {
    return 1;
  } else if (stat === "strength") {
    return 1;
  } else if (stat === "dexterity") {
    return -3;
  } else if (stat === "physicality") {
    return 2;
  } else if (stat === "psyche") {
    return 1;
  } else {
    return 0;
  }
}

function hobbitRaceStatModifier(stat) {
  if (stat === "strength") {
    return -2;
  } else if (stat === "dexterity") {
    return 2;
  } else if (stat === "physicality") {
    return -1;
  } else if (stat === "intelligence") {
    return 1;
  } else {
    return 0;
  }
}

function halfElvenRaceStatModifier(stat) {
  if (stat === "dexterity") {
    return 1;
  } else if (stat === "size") {
    return 5;
  } else {
    return 0;
  }
}

function halfTrollRaceStatModifier(stat) {
  if (stat === "strength") {
    return 2;
  } else if (stat === "size") {
    return 6;
  } else if (stat === "intelligence") {
    return -1;
  } else if (stat === "psyche") {
    return -1;
  } else if (stat === "spirituality") {
    return -3;
  } else {
    return 0;
  }
}

function ageStatModifier(age, stat) {
  if (age === 'young') {
    return youngStatModifier(stat);
  } else if (age === 'mature') {
    return matureStatModifier(stat);
  } else if (age === 'grownUp') {
    return grownUpStatModifier(stat);
  } else if (age === 'middleAged') {
    return middleAgedStatModifier(stat);
  } else if (age === 'old') {
    return oldStatModifier(stat);
  } else if (age === 'ancient') {
    return ancientStatModifier(stat);
  }
}

function youngStatModifier(stat) {
  if (stat === 'physicality') {
    return 2;
  } else if (stat === "strength") {
    return -1;
  } else if (stat === "dexterity") {
    return 2;
  } else if (stat === "intelligence") {
    return -1;
  } else if (stat === "psyche") {
    return -3;
  } else {
    return 0;
  }
}

function matureStatModifier(stat) {
  if (stat === 'physicality') {
    return 1;
  } else if (stat === "strength") {
    return 1;
  } else if (stat === "dexterity") {
    return 1;
  } else {
    return 0;
  }
}

function grownUpStatModifier(stat) {
  if (stat === "intelligence") {
    return 1;
  } else if (stat === "psyche") {
    return 1;
  } else {
    return 0;
  }
}

function middleAgedStatModifier(stat) {
  if (stat === 'intelligence') {
    return 2;
  } else if (stat === "strength") {
    return -1;
  } else if (stat === "physicality") {
    return -1;
  } else if (stat === "dexterity") {
    return -1;
  } else if (stat === "charisma") {
    return 1;
  } else if (stat === "psyche") {
    return 2;
  } else if (stat === "spirituality") {
    return 1;
  } else {
    return 0;
  }
}

function oldStatModifier(stat) {
  if (stat === 'intelligence') {
    return 2;
  } else if (stat === "strength") {
    return -3;
  } else if (stat === "physicality") {
    return -3;
  } else if (stat === "dexterity") {
    return -3;
  } else if (stat === "size") {
    return -1;
  } else if (stat === "psyche") {
    return 3;
  } else if (stat === "spirituality") {
    return 2;
  } else {
    return 0;
  }
}

function ancientStatModifier(stat) {
  if (stat === "strength") {
    return -6;
  } else if (stat === "physicality") {
    return -6;
  } else if (stat === "dexterity") {
    return -5;
  } else if (stat === "size") {
    return -1;
  } else if (stat === "psyche") {
    return 3;
  } else if (stat === "spirituality") {
    return 4;
  } else {
    return 0;
  }
}

function recalc() {
  let level = getValue("level");
  let strength = getIntegerValue("strength");
  let physicality = getIntegerValue("physicality");
  let dexterity = getIntegerValue("dexterity");
  let size = getIntegerValue("size");
  let intelligence = getIntegerValue("intelligence");
  let psyche = getIntegerValue("psyche");
  let spirituality = getIntegerValue("spirituality");
  let charisma = getIntegerValue("charisma");
  let extraHitPoints = getIntegerValue("extra-hit-points");
  let race = document.getElementById("race").value;
  let proficiency = document.getElementById("proficiency").value;
  let age = getIntegerValue("age");

  chanceLearnSpell(intelligence, spirituality);
  hitPoints(psyche, physicality, size, extraHitPoints);
  movement(dexterity, size);
  fightingCapacity(strength, physicality, dexterity);
  damageBonus(strength, size);
  terrorModification(psyche);
  initiativeModification(dexterity);
  equipLoad(strength);
  abilityPoints(strength, physicality, dexterity, size, intelligence, psyche, spirituality, charisma, age, race, proficiency, level);
  calculateItemCosts();
  armourPoints();
}

function reroll() {
  characterLocationUrl = null;
  rollAge();
  rollStats();
  rollHand();
  document.getElementById("money").value = rollMoney();
  previousRace = document.getElementById("race").value;
  attacksAndParries();
}

function rollHand() {
  let mainHand = document.getElementById("main-hand");
  let mainHandRoll = roll("1T20");
  if (mainHandRoll === 20) {
    mainHand.value = "ambidextrious";
  } else if (mainHandRoll === 19) {
    mainHand.value = "both";
  } else if (mainHandRoll > 14) {
    mainHand.value = "left";
  } else {
    mainHand.value = "right";
  }
}

function rollMoney() {
  let rolledSocioEconomicalClass = roll("2T20");
  if (rolledSocioEconomicalClass == 40) {
    return Infinity;
  } else if (rolledSocioEconomicalClass > 36) {
    return roll("3T3") * 600;
  } else if (rolledSocioEconomicalClass > 32) {
    return roll("3T3") * 300;
  } else if (rolledSocioEconomicalClass > 27) {
    return roll("3T3") * 200;
  } else if (rolledSocioEconomicalClass > 20) {
    return roll("3T3") * 200;
  } else if (rolledSocioEconomicalClass > 15) {
    return roll("2T3") * 100;
  } else if (rolledSocioEconomicalClass > 7) {
    return roll("1T3") * 100;
  } else if (rolledSocioEconomicalClass > 2) {
    return roll("1T3") * 50;
  } else {
    return 0;
  }
}

function rollAge() {
  let race = document.getElementById("race").value;
  let ageRoll = roll("1T20");
  let age = null;
  if (ageRoll == 20) {
    age = "ancient";
  } else if (ageRoll > 17) {
    age = "old";
  } else if (ageRoll > 14) {
    age = "middleAged";
  } else if (ageRoll > 9) {
    age = "grownUp";
  } else if (ageRoll > 4) {
    age = "mature";
  } else {
    age = "young";
  }
  previousAge = age;
  document.getElementById("age").value = rollAgeForRace(age, race);
}

function rollAgeForRace(age, race) {
  let interval = raceLookupTable[race].age[age].to - raceLookupTable[race].age[age].from;
  return raceLookupTable[race].age[age].from + parseInt(Math.random() * interval);
}

function rollStats() {
  let race = document.getElementById("race").value;
  document.getElementById("strength").value = roll("3T6") + raceStatModifier(race, "strength") + ageStatModifier(previousAge, "strength");
  document.getElementById("physicality").value = roll("3T6") + raceStatModifier(race, "physicality") + ageStatModifier(previousAge, "physicality");
  document.getElementById("dexterity").value = roll("3T6") + raceStatModifier(race, "dexterity") + ageStatModifier(previousAge, "dexterity");
  document.getElementById("size").value = roll("2T6") + raceStatModifier(race, "size") + ageStatModifier(previousAge, "size");
  document.getElementById("intelligence").value = roll("3T6") + raceStatModifier(race, "intelligence") + ageStatModifier(previousAge, "intelligence");
  document.getElementById("psyche").value = roll("3T6") + raceStatModifier(race, "psyche") + ageStatModifier(previousAge, "psyche");
  document.getElementById("spirituality").value = roll("3T6") + raceStatModifier(race, "spirituality") + ageStatModifier(previousAge, "spirituality");
  document.getElementById("charisma").value = roll("3T6") + raceStatModifier(race, "charisma") + ageStatModifier(previousAge, "charisma");
}

function attacksAndParries() {
  let proficiency = document.getElementById("proficiency").value;
  let attacksAndParries = document.getElementById("attacks-and-parries");
  let attacks = proficiencyLookupTable[proficiency].attacks;
  let parries = proficiencyLookupTable[proficiency].parries;

  let numberOfRows = attacksAndParries.rows.length - 1;
  for (let i = 0; i < numberOfRows; ++i) {
    attacksAndParries.deleteRow(attacksAndParries.rows.length - 1);
  }

  for (let i = 0; i < Math.max(parries, attacks); ++i) {
    let row = attacksAndParries.insertRow()
    let attackCell = row.insertCell();
    if (i < attacks) {
      attackCell.style.textAlign = "center";
      attackCell.appendChild(createStatElement());
    }
    if (i < parries) {
      let parryCell = row.insertCell();
      parryCell.style.textAlign = "center";
      parryCell.appendChild(createStatElement());
    }
  }
}

function getIntegerValue(attributeName) {
  return parseInt(document.getElementById(attributeName).value);
}

function equipLoad(strength) {
  document.getElementById("equip-load").value = strength;
}

function chanceLearnSpell(intelligence, spirituality) {
  document.getElementById("chance-learn-spell").value = Math.floor((intelligence + spirituality) / 2.0);
}

function terrorModification(psyche) {
  document.getElementById("terror-modification").value = modificationLookup(psyche);
}

function initiativeModification(dexterity) {
  document.getElementById("initiative-modification").value = modificationLookup(dexterity);
}

function modificationLookup(value) {
  if (value > 14) {
    return 13 - value;
  } else if (value > 12) {
    return -1;
  } else if (value > 10) {
    return 0;
  } else if (value > 8) {
    return 1;
  } else if (value > 5) {
    return 2
  } else if (value > 2) {
    return 3;
  } else {
    return 4;
  }
}

function hitPoints(psyche, physicality, size, extraHitPoints) {
  let baseHitPoints = Math.floor((psyche + physicality + size));
  let totalHitPoints = baseHitPoints + extraHitPoints;
  //document.getElementById("base-hit-points").value = baseHitPoints;
  document.getElementById("total-hit-points").value = totalHitPoints;
  document.getElementById("head-hit-points").value = Math.floor(totalHitPoints / 4.0);
  document.getElementById("right-arm-hit-points").value = Math.floor(totalHitPoints / 4.0);
  document.getElementById("left-arm-hit-points").value = Math.floor(totalHitPoints / 4.0);
  document.getElementById("torso-hit-points").value = Math.floor(totalHitPoints / 2.0);
  document.getElementById("stomach-hit-points").value = Math.floor(totalHitPoints / 3.0);
  document.getElementById("left-leg-hit-points").value = Math.floor(totalHitPoints / 3.0);
  document.getElementById("right-leg-hit-points").value = Math.floor(totalHitPoints / 3.0);
}

function movement(dexterity, size) {
  document.getElementById("movement").value = Math.floor((dexterity + size) / 2.0);
}

function fightingCapacity(strength, physicality, dexterity) {
  let fightingCapacity = Math.floor((strength + physicality + dexterity) / 3.0);
  let extraFightingCapacity = parseInt(document.getElementById('extra-fighting-capacity').value);
  document.getElementById("total-fighting-capacity").value = fightingCapacity + extraFightingCapacity - fightingCapacityCost();
}

function getAttacksAndParries() {
  let attacksAndParries = document.getElementById("attacks-and-parries")
  let attacks = [];
  let parries = [];
  for (let i = 1; i < attacksAndParries.rows.length; ++i) {
    let attackColumn = attacksAndParries.rows[i].cells[0].childNodes[0];
    if (attackColumn) {
      let value = attackColumn.value;
      if (value) {
        attacks.push(parseInt(value));
      } else {
        attacks.push(0);
      }
    }

    parryColumn = attacksAndParries.rows[i].cells[1];
    if (parryColumn) {
      let value = parryColumn.childNodes[0].value;
      if (value) {
        parries.push(parseInt(value));
      } else {
        parries.push(0);
      }
    }
  }
  return {
    "attacks": attacks,
    "parries": parries
  };
}

function fightingCapacityCost() {
  let attacksAndParries = document.getElementById("attacks-and-parries");
  let totalCost = 0;
  for (let i = 0; i < attacksAndParries.rows.length; ++i) {
    let attackColumn = attacksAndParries.rows[i].cells[0].childNodes[0];
    let attackCost = 0;
    if (attackColumn) {
      attackCost = attackColumn.value;
    }
    parryColumn = attacksAndParries.rows[i].cells[1];

    let parryCost = 0;
    if (parryColumn) {
      parryCost = parryColumn.childNodes[0].value;
    }
    totalCost += attackCost ? parseInt(attackCost) : 0;
    totalCost += parryCost ? parseInt(parryCost) : 0;
  }
  return totalCost;
}

function damageBonus(strength, size) {
  let damageBonusLookupValue = strength + size;
  let damageBonusElement = document.getElementById("damage-bonus")
  if (damageBonusLookupValue > 90) {
    damageBonusElement.value = "7T6";
  } else if (damageBonusLookupValue > 80) {
    damageBonusElement.value = "6T6";
  } else if (damageBonusLookupValue > 70) {
    damageBonusElement.value = "5T6";
  } else if (damageBonusLookupValue > 60) {
    damageBonusElement.value = "4T6";
  } else if (damageBonusLookupValue > 50) {
    damageBonusElement.value = "3T6";
  } else if (damageBonusLookupValue > 40) {
    damageBonusElement.value = "2T6";
  } else if (damageBonusLookupValue > 30) {
    damageBonusElement.value = "1T6";
  } else if (damageBonusLookupValue > 20) {
    damageBonusElement.value = "1T3";
  } else {
    damageBonusElement.value = "0";
  }
}

function addAbility() {
  let abilities = document.getElementById("abilities");
  let row = abilities.insertRow()
  let abilityCell = row.insertCell();
  let selectNode = document.createElement("select");
  abilityCell.appendChild(selectNode);
  for (let abilityName in abilityLookUpTable) {
    let option = document.createElement("option")
    option.value = abilityName;
    option.textContent = abilityName;
    selectNode.add(option);
  }

  let abilityValueCell = row.insertCell();
  let abilityValue = createStatElement();
  abilityValueCell.appendChild(abilityValue);

  addRemoveButton(abilities, row, row.insertCell());

  return {
    "selectNode": selectNode,
    "value": abilityValue
  };
}

function calculateWeaponsWeight() {
  let weapons = document.getElementById("weapons");
  let weight = 0;
  for (let i = 1; i < weapons.rows.length; ++i) {
    let itemName = weapons.rows[i].cells[0].childNodes[0].value;
    if (itemName) {
      weight += weaponLookupTable[itemName].weight;
    }
  }
  return weight;
}

function calculateWeaponsCost() {
  let weapons = document.getElementById("weapons");
  let price = 0;
  for (let i = 1; i < weapons.rows.length; ++i) {
    let itemName = weapons.rows[i].cells[0].childNodes[0].value;
    if (itemName) {
      price += weaponLookupTable[itemName].price;
    }
  }
  return price;
}


function calculateItemCosts() {
  let items = document.getElementById("items");
  let totalItemWeight = 0;
  let totalItemCost = 0;
  for (let i = 1; i < items.rows.length; ++i) {
    let itemName = items.rows[i].cells[0].childNodes[0].value;
    let itemValue = parseInt(items.rows[i].cells[1].childNodes[0].value);
    if (!itemValue) {
      continue;
    }
    let itemWeight = equipmentLookUpTable[itemName].weight;
    let itemCost = equipmentLookUpTable[itemName].price;
    totalItemCost += itemCost * itemValue;
    totalItemWeight += itemWeight * itemValue;
  }

  totalItemCost += calculateArmourCost();
  totalItemWeight += calculateArmourWeight() / 2.0;

  totalItemCost += calculateWeaponsCost();
  totalItemWeight += calculateWeaponsWeight();

  document.getElementById("total-weight").value = totalItemWeight;
  document.getElementById("spent").value = totalItemCost;
}

function calculateArmourWeight() {
  let weight = 0;

  let headArmour = document.getElementById("head-armour").value;
  let leftArmArmour = document.getElementById("left-arm-armour").value;
  let rightArmArmour = document.getElementById("right-arm-armour").value;
  let torsoArmour = document.getElementById("torso-armour").value;
  let stomachArmour = document.getElementById("stomach-armour").value;
  let leftLegArmour = document.getElementById("left-leg-armour").value;
  let rightLegArmour = document.getElementById("right-leg-armour").value;

  weight += armourLookupTable[headArmour].weight.head;
  weight += armourLookupTable[leftArmArmour].weight.arm;
  weight += armourLookupTable[rightArmArmour].weight.arm;
  weight += armourLookupTable[torsoArmour].weight.torso;
  weight += armourLookupTable[stomachArmour].weight.torso;
  weight += armourLookupTable[leftLegArmour].weight.leg;
  weight += armourLookupTable[rightLegArmour].weight.leg;

  return weight;
}

function calculateArmourCost() {
  let cost = 0;

  let headArmour = document.getElementById("head-armour").value;
  let leftArmArmour = document.getElementById("left-arm-armour").value;
  let rightArmArmour = document.getElementById("right-arm-armour").value;
  let torsoArmour = document.getElementById("torso-armour").value;
  let stomachArmour = document.getElementById("stomach-armour").value;
  let leftLegArmour = document.getElementById("left-leg-armour").value;
  let rightLegArmour = document.getElementById("right-leg-armour").value;

  cost += armourLookupTable[headArmour].price.head;
  cost += armourLookupTable[leftArmArmour].price.arm;
  cost += armourLookupTable[rightArmArmour].price.arm;
  cost += armourLookupTable[torsoArmour].price.torso;
  cost += armourLookupTable[stomachArmour].price.torso;
  cost += armourLookupTable[leftLegArmour].price.leg;
  cost += armourLookupTable[rightLegArmour].price.leg;

  return cost;
}

function addItem() {
  let items = document.getElementById("items");
  let row = items.insertRow()
  let cell = row.insertCell();
  let selectNode = document.createElement("select");
  cell.appendChild(selectNode);
  for (let key in equipmentLookUpTable) {
    let option = document.createElement("option")
    option.value = key;
    option.textContent = key;
    selectNode.add(option);
  }
  let valueCell = row.insertCell();
  let value = createStatElement();
  valueCell.appendChild(value);
  addRemoveButton(items, row, row.insertCell());
  return {
    "selectNode": selectNode,
    "value": value
  };
}

function addWeapon() {
  let weapons = document.getElementById("weapons");
  let row = weapons.insertRow();
  let cell = row.insertCell();
  let selectNode = document.createElement("select");
  cell.appendChild(selectNode);
  for (let key in weaponLookupTable) {
    let option = document.createElement("option")
    option.value = key;
    option.textContent = key;
    selectNode.add(option);
  }

  let removeCell = row.insertCell();
  addRemoveButton(weapons, row, removeCell);

  return selectNode;
}

function addRemoveButton(table, row, cell) {
  let removeButton = document.createElement('button');
  removeButton.textContent = 'X'
  removeButton.onclick = function() {
    let rows = table.rows;
    for (let i = 1; i < rows.length; ++i) {
      if (rows[i] == row) {
        table.deleteRow(i);
        return;
      }
    }
  };
  cell.appendChild(removeButton);
}

function createStatElement() {
  let statElement = document.createElement("input");
  statElement.classList.add("stat");
  statElement.onkeyup = function() {
    recalc();
  }
  return statElement;
}

function totalAbilityCost(race, proficiency) {
  let abilities = document.getElementById("abilities");
  let totalAbilityCost = 0;
  for (let i = 1; i < abilities.rows.length; ++i) {
    let abilityName = abilities.rows[i].cells[0].childNodes[0].value;
    let abilityValue = abilities.rows[i].cells[1].childNodes[0].value;
    let abilityMultiplier = getAbilityCostMultiplier(proficiency, abilityName);
    abilityValue -= freeAbilityPoints(race, proficiency, abilityName);
    if (abilityValue > 17) {
      totalAbilityCost += (abilityValue - 17) * abilityMultiplier * 5;
      abilityValue -= (abilityValue - 17);
    }
    if (abilityValue > 15) {
      totalAbilityCost += (abilityValue - 15) * abilityMultiplier * 4;
      abilityValue -= (abilityValue - 15);
    }
    if (abilityValue > 12) {
      totalAbilityCost += (abilityValue - 12) * abilityMultiplier * 3;
      abilityValue -= (abilityValue - 12);
    }
    if (abilityValue > 7) {
      totalAbilityCost += (abilityValue - 7) * abilityMultiplier * 2;
      abilityValue -= (abilityValue - 7);
    }
    if (abilityValue > 0) {
      totalAbilityCost += abilityValue * abilityMultiplier;
      abilityValue -= abilityValue;
    }
  }
  return totalAbilityCost;
}

function freeAbilityPoints(race, proficiency, abilityName) {
  let freeAbilityPoints = 0;

  let proficiencyFreeAbilityPoints = proficiencyLookupTable[proficiency].freeAbilityPoints[abilityName];
  if (proficiencyFreeAbilityPoints) {
    freeAbilityPoints += proficiencyFreeAbilityPoints;
  }

  let raceFreeAbilityPoints = raceLookupTable[race].freeAbilityPoints[abilityName];
  if (raceFreeAbilityPoints) {
    freeAbilityPoints += raceFreeAbilityPoints;
  }

  return freeAbilityPoints;
}

function getAbilityCostMultiplier(proficiency, abilityName) {
  if (isProficientWith(proficiency, abilityName)) {
    return abilityLookUpTable[abilityName].proficencyCost;
  } else {
    return abilityLookUpTable[abilityName].cost;
  }
}

function isProficientWith(proficiency, abilityName) {
  return proficiencyLookupTable[proficiency].proficiencyAbilities.includes(abilityName);
}

function abilityPoints(strength, physicality, dexterity, size, intelligence, psyche, spirituality, charisma, age, race, proficiency, level) {
  let abilityPoints = (lookupAbilityPoints(strength) +
    lookupAbilityPoints(physicality) +
    lookupAbilityPoints(dexterity) +
    lookupAbilityPoints(size) +
    lookupAbilityPoints(intelligence) +
    lookupAbilityPoints(psyche) +
    lookupAbilityPoints(spirituality) +
    lookupAbilityPoints(charisma));
  abilityPoints *= (abilityPointAgeModifier(age, race) + abilityPointLevelModifier(level));
  if (proficiency === 'scholar') {
    abilityPoints *= 2;
  }
  document.getElementById('ability-points').value = Math.floor(abilityPoints) - totalAbilityCost(race, proficiency);
}

function abilityPointLevelModifier(level) {
  if (level === 'amateur') {
    return 0;
  } else if (level === 'apprentice') {
    return 1;
  } else if (level === 'practitioner') {
    return 2;
  } else if (level === 'master') {
    return 3;
  } else if (level === 'legend') {
    return 4;
  }
}

function abilityPointAgeModifier(age, race) {
  if (race === 'elven') {
    return elvenAbilityPointAgeModifier(age);
  } else if (race === 'human') {
    return humanAbilityPointAgeModifier(age);
  } else if (race === 'dwarf') {
    return dwarfAbilityPointAgeModifier(age);
  } else if (race === 'hobbit') {
    return hobbitAbilityPointAgeModifier(age);
  } else if (race === 'half-elven') {
    return halfElvenAbilityPointAgeModifier(age);
  } else if (race === 'half-troll') {
    return halfTrollAbilityPointAgeModifier(age);
  }
}

function populateArmourOptions() {
  let headArmour = document.getElementById("head-armour");
  let leftArmArmour = document.getElementById("left-arm-armour");
  let rightArmArmour = document.getElementById("right-arm-armour");
  let torsoArmour = document.getElementById("torso-armour");
  let stomachArmour = document.getElementById("stomach-armour");
  let leftLegArmour = document.getElementById("left-leg-armour");
  let rightLegArmour = document.getElementById("right-leg-armour");

  let armours = [headArmour, leftArmArmour, rightArmArmour, torsoArmour,
    stomachArmour, leftLegArmour, rightLegArmour
  ];

  for (let armourName in armourLookupTable) {
    for (let i = 0; i < armours.length; ++i) {
      let option = document.createElement('option');
      option.value = armourName;
      option.textContent = armourLookupTable[armourName].text;
      armours[i].add(option);
    }
  }
}

function armourPoints() {
  let headArmour = document.getElementById("head-armour").value;
  let leftArmArmour = document.getElementById("left-arm-armour").value;
  let rightArmArmour = document.getElementById("right-arm-armour").value;
  let torsoArmour = document.getElementById("torso-armour").value;
  let stomachArmour = document.getElementById("stomach-armour").value;
  let leftLegArmour = document.getElementById("left-leg-armour").value;
  let rightLegArmour = document.getElementById("right-leg-armour").value;

  document.getElementById("head-armour-points").value = armourLookupTable[headArmour].armourPoints;
  document.getElementById("left-arm-armour-points").value = armourLookupTable[leftArmArmour].armourPoints;
  document.getElementById("right-arm-armour-points").value = armourLookupTable[rightArmArmour].armourPoints;
  document.getElementById("torso-armour-points").value = armourLookupTable[torsoArmour].armourPoints;
  document.getElementById("stomach-armour-points").value = armourLookupTable[stomachArmour].armourPoints;
  document.getElementById("left-leg-armour-points").value = armourLookupTable[leftLegArmour].armourPoints;
  document.getElementById("right-leg-armour-points").value = armourLookupTable[rightLegArmour].armourPoints;
}

function halfTrollAbilityPointAgeModifier(age) {
  if (age > 42) {
    return 3;
  } else if (age > 36) {
    return 2.5;
  } else if (age > 30) {
    return 2;
  } else if (age > 22) {
    return 1.5;
  } else if (age > 16) {
    return 1;
  } else {
    return 0.5;
  }
}

function halfElvenAbilityPointAgeModifier(age) {
  if (age > 260) {
    return 3;
  } else if (age > 210) {
    return 2.5;
  } else if (age > 150) {
    return 2;
  } else if (age > 100) {
    return 1.5;
  } else if (age > 60) {
    return 1;
  } else {
    return 0.5;
  }
}


function hobbitAbilityPointAgeModifier(age) {
  if (age > 65) {
    return 3;
  } else if (age > 55) {
    return 2.5;
  } else if (age > 35) {
    return 2;
  } else if (age > 25) {
    return 1.5;
  } else if (age > 18) {
    return 1;
  } else {
    return 0.5;
  }
}

function dwarfAbilityPointAgeModifier(age) {
  if (age > 400) {
    return 3;
  } else if (age > 250) {
    return 2.5;
  } else if (age > 155) {
    return 2;
  } else if (age > 90) {
    return 1.5;
  } else if (age > 35) {
    return 1;
  } else {
    return 0.5;
  }
}

function humanAbilityPointAgeModifier(age) {
  if (age > 70) {
    return 3;
  } else if (age > 60) {
    return 2.5;
  } else if (age > 40) {
    return 2;
  } else if (age > 25) {
    return 1.5;
  } else if (age > 18) {
    return 1;
  } else {
    return 0.5;
  }
}

function elvenAbilityPointAgeModifier(age) {
  if (age > 2000) {
    return 3;
  } else if (age > 1700) {
    return 2.5;
  } else if (age > 1000) {
    return 2;
  } else if (age > 300) {
    return 1.5;
  } else if (age > 160) {
    return 1;
  } else {
    return 0.5;
  }
}

function lookupAbilityPoints(stat) {
  if (stat >= 20) {
    return 15;
  } else if (stat === 19) {
    return 13;
  } else if (stat === 18) {
    return 11;
  } else if (stat === 17) {
    return 9;
  } else if (stat > 14) {
    return 8;
  } else if (stat > 12) {
    return 7;
  } else if (stat > 10) {
    return 6;
  } else if (stat > 8) {
    return 5;
  } else if (stat > 5) {
    return 4;
  } else if (stat > 2) {
    return 3;
  } else {
    return 2;
  }
}

window.onload = function() {
  getLanguageRest("swedish");
  populateArmourOptions();
  reroll();
  recalc();
}
