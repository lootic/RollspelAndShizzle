function recalc() {
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
  abilityPoints(strength, physicality, dexterity, size, intelligence, psyche, spirituality, charisma, age, race, proficiency);
  armourPoints();
  attacksAndParries(proficiency);
}

function attacksAndParries(proficiency) {
  let attacksAndParries = document.getElementById("attacks-and-parries");
  let attacks = proficiencyLookupTable[proficiency].attacks;
  let parries = proficiencyLookupTable[proficiency].parries;
  let numberOfRows = attacksAndParries.rows.length - 1;
  if (numberOfRows > parries) {
    for (let i = parries; i < numberOfRows; ++i) {
      attacksAndParries.deleteRow(1);
    }
  }
  for (let i = numberOfRows; i < parries; ++i) {
    let row = attacksAndParries.insertRow()
    let attackCell = row.insertCell();
    if (i < attacks) {
      attackCell.style.textAlign = "center";
      attackCell.appendChild(createStatElement());
    }
    let parryCell = row.insertCell();
    parryCell.style.textAlign = "center";
    parryCell.appendChild(createStatElement());
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

function fightingCapacityCost() {
  let attacksAndParries = document.getElementById("attacks-and-parries");
  let totalCost = 0;
  for (let i = 0; i < attacksAndParries.rows.length; ++i) {
    let attackCost = attacksAndParries.rows[i].cells[0].childNodes[0].value;
    let parryCost = attacksAndParries.rows[i].cells[1].childNodes[0].value;
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
    abilityValue -= freeAbilityPoints(race, proficiency, abilityValue);
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

function freeAbilityPoints(race, proficiency, abilityName, abilityValue) {
  return 0;
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

function abilityPoints(strength, physicality, dexterity, size, intelligence, psyche, spirituality, charisma, age, race, proficiency) {
  let abilityPoints = abilityPointAgeModifier(age, race) * (lookupAbilityPoints(strength) +
    lookupAbilityPoints(physicality) +
    lookupAbilityPoints(dexterity) +
    lookupAbilityPoints(size) +
    lookupAbilityPoints(intelligence) +
    lookupAbilityPoints(psyche) +
    lookupAbilityPoints(spirituality) +
    lookupAbilityPoints(charisma));
  document.getElementById('ability-points').value = Math.floor(abilityPoints) - totalAbilityCost(race, proficiency);
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
  populateArmourOptions();
}
