let proficiencyLookupTable = {
  "warrior": {
    "proficiencyAbilities": [
      "Avväpna", "Dra vapen", "Fiska", "Första hjälpen", "Geografi",
      "Hasardspel", "Hoppa", "Ilmarsch", "Jaga", "Kamouflage", "Klättra",
      "Orientering", "Rida", "Slagsmål", "Två Vapen", "Överlevnad"
    ],
    "freeAbilityPoints": {},
    "attacks": 4,
    "parries": 4
  },
  "knight": {
    "proficiencyAbilities": [
      "Avväpna", "Dra vapen", "Fiska", "Första hjälpen", "Geografi",
      "Hasardspel", "Hoppa", "Ilmarsch", "Jaga", "Kamouflage", "Klättra",
      "Orientering", "Rida", "Slagsmål", "Två Vapen", "Överlevnad",
      "Administration", "Dans", "Förhöra", "Heraldik", "Historia",
      "Kulturkännedom", "Läsa/skriva modersmål", "Räkna", "Spela instrument",
      "Taktik", "Övertala"
    ],
    "freeAbilityPoints": {},
    "attacks": 4,
    "parries": 4
  },
  "wizard": {
    "proficiencyAbilities": [
      "Botanik", "Drogkunskap", "Historia",
      "Läsa/skriva främmande språk", "Läsa/skriva modersmål",
      "Magisk skrift", "Räkna", "Spå väder", "Tala främmande språk",
      "Zoologi"
    ],
    "freeAbilityPoints": {},
    "attacks": 1,
    "parries": 1
  },
  "sword-magician": {
    "proficiencyAbilities": [
      "Botanik", "Drogkunskap", "Historia",
      "Läsa/skriva främmande språk", "Läsa/skriva modersmål",
      "Magisk skrift", "Räkna", "Spå väder", "Tala främmande språk",
      "Zoologi"
    ],
    "freeAbilityPoints": {},
    "attacks": 1,
    "parries": 1
  },
  "priest": {
    "proficiencyAbilities": [
      "Administration", "Första hjälpen",
      "Geografi", "Heraldik", "Historia", "Läkeörtkunskap",
      "Läsa/skriva främmande språk", "Läsa/skriva modersmål",
      "Räkna", "Sjunga", "Tala främmande språk"
    ],
    "freeAbilityPoints": {},
    "attacks": 1,
    "parries": 1
  },
  "holy-warrior": {
    "proficiencyAbilities": [
      "Avväpna", "Taktik", "Två Vapen",
      "Administration", "Första hjälpen", "Geografi", "Heraldik",
      "Historia", "Läkeörtkunskap", "Läsa/skriva främmande språk",
      "Läsa/skriva modersmål", "Räkna", "Sjunga",
      "Tala främmande språk"
    ],
    "freeAbilityPoints": {},
    "attacks": 2,
    "parries": 3
  },
  "thief": {
    "proficiencyAbilities": [
      "Bluffa", "Buktala", "Dyrka lås",
      "Finna dolda ting", "Förfalska", "Förklädnad", "Giftkunskap",
      "Gömma sig", "Hantera fällor", "Hasardspel", "Hoppa", "Klättra",
      "Knopar", "Lyssna", "Läppläsning", "Muta", "Skugga", "Smyga",
      "Teckenspråk", "Undre världen", "Värdesätta", "Änterhake"
    ],
    "freeAbilityPoints": {
      "Värdesätta": 2,
      "Undre världen": 2
    },
    "attacks": 2,
    "parries": 1
  },
  "hunter": {
    "proficiencyAbilities": [
      "Djurträning", "Geografi", "Geologi",
      "Gömma sig", "Hoppa", "Jaga", "Kanot", "Klättra", "Knopar",
      "Lyssna", "Orientering", "Rida", "Simma", "Skugga", "Smyga",
      "Spå väder", "Spåra", "Zoologi", "Överlevnad"
    ],
    "freeAbilityPoints": {},
    "attacks": 2,
    "parries": 1
  },
  "messenger": {
    "proficiencyAbilities": [
      "Administration", "Geografi", "Geologi", "Gömma sig", "Jaga", "Klättra",
      "Lyssna", "Läsa/skriva modersmål", "Läsa/skriva främmande språk",
      "Orientering", "Rida", "Smyga", "Spå väder", "Överlevnad"
    ],
    "freeAbilityPoints": {
      "Rida": 2,
      "Orientering": 2
    },
    "attacks": 1,
    "parries": 2
  },
  "craftsman": {
    "proficiencyAbilities": ["Bluffa", "Förfalska",
      "Hantverk(Styrkebaserat)", "Hantverk(Smidighetsbaserat)",
      "Hantverk(Intelligensbaserat)", "Knopar", "Köpslå",
      "Köra vagn", "Läsa/skriva modersmål", "Räkna", "Värdesätta",
      "Övertala"
    ],
    "freeAbilityPoints": {
      "Hantverk(Styrkebaserat)": 3,
      "Hantverk(Smidighetsbaserat)": 3,
      "Hantverk(Intelligensbaserat)": 3
    },
    "attacks": 1,
    "parries": 1
  },
  "merchant": {
    "proficiencyAbilities": [
      "Administration", "Bluffa", "Förfalska", "Geografi",
      "Historia", "Kulturkännedom", "Köpslå", "Köra vagn",
      "Läsa/skriva modersmål", "Muta", "Orientering", "Provsmaka",
      "Rida", "Räkna", "Tala främmande språk", "Värdesätta",
      "Övertala"
    ],
    "freeAbilityPoints": {
      "Köpslå": 5,
      "Värdesätta": 5
    },
    "attacks": 1,
    "parries": 1
  },
  "scholar": {
    "proficiencyAbilities": ["Administration", "Botanik",
      "Drogkunskap", "Första hjälpen", "Geografi", "Geologi",
      "Giftkunskap", "Heraldik", "Historia", "Kulturkännedom",
      "Läkekonst", "Läkeörtkunskap", "Läsa/skriva främmande språk",
      "Läsa/skriva modersmål", "Magisk skrift", "Navigera",
      "Provsmaka", "Räkna", "Sjökunnighet", "Tala främmande språk",
      "Värdesätta", "Zoologi"
    ],
    "freeAbilityPoints": {},
    "attacks": 1,
    "parries": 1
  },
  "entertainer": {
    "proficiencyAbilities": ["Buktala", "Dans", "Djurträning",
      "Gyckelkonster", "Hasardspel", "Heraldik", "Historia", "Hoppa",
      "Hypnotisera", "Klättra", "Lyssna", "Läppläsning", "Målning",
      "Schack och brädspel", "Sjunga", "Skådespeleri", "Smyga",
      "Spela instrument", "Stjäla föremål", "Undre världen"
    ],
    "freeAbilityPoints": {},
    "attacks": 1,
    "parries": 1
  }
}
