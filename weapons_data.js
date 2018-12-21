let weaponLookupTable = {
  "Dolk": {
    "class": "L",
    "weight": 0.5,
    "strengthRequirement": 1,
    "breakpoint": 10,
    "damage": "1T6+2",
    "price": 70,
    "reach": 1
  },
  "Handyxa": {
    "class": "L",
    "weight": 3,
    "breakpoint": 15,
    "strengthRequirement": 9,
    "damage": "1T8+2",
    "price": 60,
    "reach": 1
  },
  "Klubba": {
    "class": "L",
    "weight": 1,
    "breakpoint": 10,
    "strengthRequirement": 5,
    "damage": "1T8+1",
    "price": 20,
    "reach": 1
  },
  "Kortsvärd": {
    "class": "L",
    "weight": 2,
    "breakpoint": 20,
    "strengthRequirement": 7,
    "damage": "1T8+2",
    "price": 650,
    "reach": 1
  },
  "Kroksabel": {
    "class": "L",
    "weight": 3,
    "breakpoint": 18,
    "strengthRequirement": 9,
    "damage": "2T6+2",
    "price": 650,
    "reach": 1
  },
  "Piska": {
    "class": "L",
    "weight": 3,
    "breakpoint": 5,
    "strengthRequirement": 9,
    "damage": "1T3",
    "price": 120,
    "reach": 5
  },
  "Trästav": {
    "class": "L",
    "weight": 2,
    "breakpoint": 10,
    "strengthRequirement": 7, //can only one-hand if size >= strengthRequirement
    "damage": "1T8",
    "price": 120,
    "reach": 2
  },
  "Bredsvärd": {
    "class": "M",
    "weight": 4.5,
    "breakpoint": 20,
    "strengthRequirement": 13,
    "damage": "2T6+1",
    "price": 1000,
    "reach": 1
  },
  "Kortspjut": {
    "class": "M",
    "weight": 2,
    "breakpoint": 13,
    "strengthRequirement": 7,
    "damage": "1T8+1",
    "price": 90,
    "reach": 2
  },
  "Morgonstjärna": {
    "class": "M",
    "weight": 4.5,
    "breakpoint": 15,
    "strengthRequirement": 13,
    "damage": "2T6+3",
    "price": 1500,
    "reach": 1
  },
  "Pik": {
    "class": "M",
    "weight": 6.5,
    "breakpoint": 15,
    "strengthRequirement": 25,
    "damage": "2T10",
    "price": 1900,
    "reach": 2
  },
  "Slagsvärd": {
    "class": "M",
    "weight": 5.5,
    "breakpoint": 20,
    "strengthRequirement": 15,
    "damage": "2T8+2",
    "price": 2500,
    "reach": 1
  },
  "Spikklubba": {
    "class": "M",
    "weight": 1,
    "breakpoint": 10,
    "strengthRequirement": 6,
    "damage": "2T6",
    "price": 30,
    "reach": 1
  },
  "Stridsgissel": {
    "class": "M",
    "weight": 4.5,
    "breakpoint": 14,
    "strengthRequirement": 13,
    "damage": "2T6+2",
    "price": 1250,
    "reach": 1
  },
  "Stridshammare": {
    "class": "M",
    "weight": 4.5,
    "breakpoint": 20,
    "strengthRequirement": 11,
    "damage": "2T6",
    "price": 850,
    "reach": 1
  },
  "Stridsyxa": {
    "class": "M",
    "weight": 4,
    "breakpoint": 15,
    "strengthRequirement": 11,
    "damage": "2T6+3",
    "price": 450,
    "reach": 1
  },
  "Treudd": {
    "class": "M",
    "weight": 5,
    "breakpoint": 15,
    "strengthRequirement": 15,
    "damage": "2T8",
    "price": 1000,
    "reach": 2
  },
  "Hillebard": {
    "class": "H",
    "weight": 7.5,
    "breakpoint": 15,
    "strengthRequirement": 29,
    "damage": "4T6",
    "price": 1900,
    "reach": 2
  },
  "Lans": {
    "class": "H",
    "weight": 6.5,
    "breakpoint": 20,
    "strengthRequirement": 25,
    "damage": "2T8+4",
    "price": 650,
    "reach": 2
  },
  "Långspjut": {
    "class": "H",
    "weight": 4,
    "breakpoint": 15,
    "strengthRequirement": 11,
    "damage": "2T8",
    "price": 300,
    "reach": 2
  },
  "Stridsslaga": {
    "class": "H",
    "weight": 6.5,
    "breakpoint": 15,
    "strengthRequirement": 25,
    "damage": "2T6+4",
    "price": 1500,
    "reach": 1
  },
  "Tvåhandshammare": {
    "class": "H",
    "weight": 8,
    "breakpoint": 15,
    "strengthRequirement": 30,
    "damage": "4T6",
    "price": 2000,
    "reach": 2
  },
  "Tvåhandssvärd": {
    "class": "H",
    "weight": 8,
    "breakpoint": 20,
    "strengthRequirement": 31,
    "damage": "4T6+1",
    "price": 3500,
    "reach": 2
  },
  "Tvåhandsyxa": {
    "class": "H",
    "weight": 8,
    "breakpoint": 15,
    "strengthRequirement": 31,
    "damage": "4T6+2",
    "price": 1900,
    "reach": 2
  },
  "Blåsrör": {
    "class": "L",
    "weight": 0.5,
    "breakpoint": -1,
    "strengthRequirement": 2,
    "damage": "0",
    "price": 80,
    "reach": 20
  },
  "Kortbåge": {
    "class": "L",
    "weight": 2,
    "breakpoint": 10,
    "strengthRequirement": 18,
    "damage": "1T8+1",
    "price": 400,
    "reach": 135
  },
  "Slunga": {
    "class": "L",
    "weight": 0.5,
    "breakpoint": 5,
    "strengthRequirement": 10,
    "damage": "1T8",
    "price": 40,
    "reach": 90
  },
  "Långbåge": {
    "class": "M",
    "weight": 3,
    "breakpoint": 10,
    "strengthRequirement": 30,
    "damage": "1T10+1",
    "price": 700,
    "reach": 180
  },
  "Lätt armborst": {
    "class": "M",
    "weight": 5,
    "breakpoint": 15,
    "strengthRequirement": 26,
    "damage": "2T6+2",
    "price": 1300,
    "reach": 150
  },
  "Sammansatt båge": {
    "class": "M",
    "weight": 3.5,
    "breakpoint": 10,
    "strengthRequirement": 30,
    "damage": "1T12+1",
    "price": 1000,
    "reach": 180
  },
  "Stavslunga": {
    "class": "M",
    "weight": 2,
    "breakpoint": 10,
    "strengthRequirement": 22,
    "damage": "1T10",
    "price": 80,
    "reach": 120
  },
  "Arbalest": {
    "class": "H",
    "weight": 8,
    "breakpoint": 20,
    "strengthRequirement": 32,
    "damage": "2T10+2",
    "price": 4000,
    "reach": 250
  },
  "Tungt armborst": {
    "class": "H",
    "weight": 6,
    "breakpoint": 15,
    "strengthRequirement": 28,
    "damage": "2T8+2",
    "price": 2250,
    "reach": 225
  },
  "Bucklare": {
    "class": "L",
    "weight": 2,
    "breakpoint": 30,
    "strengthRequirement": 5,
    "damage": "1T3",
    "price": 100,
    "reach": 1,
    "coverage": 0
  },
  "Rundsköld": {
    "class": "M",
    "weight": 4,
    "breakpoint": 35,
    "strengthRequirement": 10,
    "damage": "1T3",
    "price": 350,
    "reach": 1,
    "coverage": 1
  },
  "Spiksköld": {
    "class": "M",
    "weight": 5,
    "breakpoint": 25,
    "strengthRequirement": 11,
    "damage": "1T8",
    "price": 480,
    "reach": 1
  },
  "Droppformad sköld": {
    "class": "H",
    "weight": 6,
    "breakpoint": 40,
    "strengthRequirement": 14,
    "damage": "1T3",
    "price": 500,
    "reach": 1,
    "coverage": 2
  },
  "Kroppssköld": {
    "class": "H",
    "weight": 10,
    "breakpoint": 40,
    "strengthRequirement": 16,
    "damage": "1T3",
    "price": 750,
    "reach": 1,
    "coverage": 3
  }
}
