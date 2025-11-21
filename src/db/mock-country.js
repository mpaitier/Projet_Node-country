const countries = [
  {
    id: 1,
    name: "France",
    capital: "Paris",
    population: 67897000,
    flag: "https://flagcdn.com/w320/fr.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 2,
    name: "United States",
    capital: "Washington, D.C.",
    population: 331900000,
    flag: "https://flagcdn.com/w320/us.png",
    continent: "North America",
    created: new Date()
  },
  {
    id: 3,
    name: "Japan",
    capital: "Tokyo",
    population: 125800000,
    flag: "https://flagcdn.com/w320/jp.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 4,
    name: "Brazil",
    capital: "Brasília",
    population: 215300000,
    flag: "https://flagcdn.com/w320/br.png",
    continent: "South America",
    created: new Date()
  },
  {
    id: 5,
    name: "Australia",
    capital: "Canberra",
    population: 26170000,
    flag: "https://flagcdn.com/w320/au.png",
    continent: "Oceania",
    created: new Date()
  },
  {
    id: 6,
    name: "South Africa",
    capital: "Cape Town",
    population: 60040000,
    flag: "https://flagcdn.com/w320/za.png",
    continent: "Africa",
    created: new Date()
  },
  {
    id: 7,
    name: "Germany",
    capital: "Berlin",
    population: 83240000,
    flag: "https://flagcdn.com/w320/de.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 8,
    name: "India",
    capital: "New Delhi",
    population: 1408000000,
    flag: "https://flagcdn.com/w320/in.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 9,
    name: "Canada",
    capital: "Ottawa",
    population: 38250000,
    flag: "https://flagcdn.com/w320/ca.png",
    continent: "North America",
    created: new Date()
  },
  {
    id: 10,
    name: "Argentina",
    capital: "Buenos Aires",
    population: 46230000,
    flag: "https://flagcdn.com/w320/ar.png",
    continent: "South America",
    created: new Date()
  },
  {
    id: 11,
    name: "Italy",
    capital: "Rome",
    population: 58850000,
    flag: "https://flagcdn.com/w320/it.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 12,
    name: "Egypt",
    capital: "Cairo",
    population: 109300000,
    flag: "https://flagcdn.com/w320/eg.png",
    continent: "Africa",
    created: new Date()
  },
  {
    id: 13,
    name: "China",
    capital: "Beijing",
    population: 1425000000,
    flag: "https://flagcdn.com/w320/cn.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 14,
    name: "Russia",
    capital: "Moscow",
    population: 146200000,
    flag: "https://flagcdn.com/w320/ru.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 15,
    name: "United Kingdom",
    capital: "London",
    population: 67500000,
    flag: "https://flagcdn.com/w320/gb.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 16,
    name: "Spain",
    capital: "Madrid",
    population: 47500000,
    flag: "https://flagcdn.com/w320/es.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 17,
    name: "Mexico",
    capital: "Mexico City",
    population: 128900000,
    flag: "https://flagcdn.com/w320/mx.png",
    continent: "North America",
    created: new Date()
  },
  {
    id: 18,
    name: "Indonesia",
    capital: "Jakarta",
    population: 275800000,
    flag: "https://flagcdn.com/w320/id.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 19,
    name: "Pakistan",
    capital: "Islamabad",
    population: 240500000,
    flag: "https://flagcdn.com/w320/pk.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 20,
    name: "Bangladesh",
    capital: "Dhaka",
    population: 170800000,
    flag: "https://flagcdn.com/w320/bd.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 21,
    name: "Nigeria",
    capital: "Abuja",
    population: 223800000,
    flag: "https://flagcdn.com/w320/ng.png",
    continent: "Africa",
    created: new Date()
  },
  {
    id: 22,
    name: "Ethiopia",
    capital: "Addis Ababa",
    population: 123400000,
    flag: "https://flagcdn.com/w320/et.png",
    continent: "Africa",
    created: new Date()
  },
  {
    id: 23,
    name: "Philippines",
    capital: "Manila",
    population: 115600000,
    flag: "https://flagcdn.com/w320/ph.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 24,
    name: "Vietnam",
    capital: "Hanoi",
    population: 98180000,
    flag: "https://flagcdn.com/w320/vn.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 25,
    name: "Turkey",
    capital: "Ankara",
    population: 85600000,
    flag: "https://flagcdn.com/w320/tr.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 26,
    name: "Iran",
    capital: "Tehran",
    population: 87920000,
    flag: "https://flagcdn.com/w320/ir.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 27,
    name: "Thailand",
    capital: "Bangkok",
    population: 71600000,
    flag: "https://flagcdn.com/w320/th.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 28,
    name: "South Korea",
    capital: "Seoul",
    population: 51780000,
    flag: "https://flagcdn.com/w320/kr.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 29,
    name: "Iraq",
    capital: "Baghdad",
    population: 43500000,
    flag: "https://flagcdn.com/w320/iq.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 30,
    name: "Afghanistan",
    capital: "Kabul",
    population: 41130000,
    flag: "https://flagcdn.com/w320/af.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 31,
    name: "Poland",
    capital: "Warsaw",
    population: 37750000,
    flag: "https://flagcdn.com/w320/pl.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 32,
    name: "Ukraine",
    capital: "Kyiv",
    population: 36740000,
    flag: "https://flagcdn.com/w320/ua.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 33,
    name: "Saudi Arabia",
    capital: "Riyadh",
    population: 36170000,
    flag: "https://flagcdn.com/w320/sa.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 34,
    name: "Malaysia",
    capital: "Kuala Lumpur",
    population: 33940000,
    flag: "https://flagcdn.com/w320/my.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 35,
    name: "Uzbekistan",
    capital: "Tashkent",
    population: 35160000,
    flag: "https://flagcdn.com/w320/uz.png",
    continent: "Asia",
    created: new Date()
  },
  {
    id: 36,
    name: "Morocco",
    capital: "Rabat",
    population: 37840000,
    flag: "https://flagcdn.com/w320/ma.png",
    continent: "Africa",
    created: new Date()
  },
  {
    id: 37,
    name: "Angola",
    capital: "Luanda",
    population: 35980000,
    flag: "https://flagcdn.com/w320/ao.png",
    continent: "Africa",
    created: new Date()
  },
  {
    id: 38,
    name: "Ghana",
    capital: "Accra",
    population: 33480000,
    flag: "https://flagcdn.com/w320/gh.png",
    continent: "Africa",
    created: new Date()
  },
  {
    id: 39,
    name: "Mozambique",
    capital: "Maputo",
    population: 33180000,
    flag: "https://flagcdn.com/w320/mz.png",
    continent: "Africa",
    created: new Date()
  },
  {
    id: 40,
    name: "Madagascar",
    capital: "Antananarivo",
    population: 30120000,
    flag: "https://flagcdn.com/w320/mg.png",
    continent: "Africa",
    created: new Date()
  },
  {
    id: 41,
    name: "Kenya",
    capital: "Nairobi",
    population: 55180000,
    flag: "https://flagcdn.com/w320/ke.png",
    continent: "Africa",
    created: new Date()
  },
  {
    id: 42,
    name: "Colombia",
    capital: "Bogotá",
    population: 52120000,
    flag: "https://flagcdn.com/w320/co.png",
    continent: "South America",
    created: new Date()
  },
  {
    id: 43,
    name: "Chile",
    capital: "Santiago",
    population: 19600000,
    flag: "https://flagcdn.com/w320/cl.png",
    continent: "South America",
    created: new Date()
  },
  {
    id: 44,
    name: "Peru",
    capital: "Lima",
    population: 34000000,
    flag: "https://flagcdn.com/w320/pe.png",
    continent: "South America",
    created: new Date()
  },
  {
    id: 45,
    name: "Venezuela",
    capital: "Caracas",
    population: 28440000,
    flag: "https://flagcdn.com/w320/ve.png",
    continent: "South America",
    created: new Date()
  },
  {
    id: 46,
    name: "Ecuador",
    capital: "Quito",
    population: 18100000,
    flag: "https://flagcdn.com/w320/ec.png",
    continent: "South America",
    created: new Date()
  },
  {
    id: 47,
    name: "New Zealand",
    capital: "Wellington",
    population: 5220000,
    flag: "https://flagcdn.com/w320/nz.png",
    continent: "Oceania",
    created: new Date()
  },
  {
    id: 48,
    name: "Papua New Guinea",
    capital: "Port Moresby",
    population: 10180000,
    flag: "https://flagcdn.com/w320/pg.png",
    continent: "Oceania",
    created: new Date()
  },
  {
    id: 49,
    name: "Fiji",
    capital: "Suva",
    population: 929000,
    flag: "https://flagcdn.com/w320/fj.png",
    continent: "Oceania",
    created: new Date()
  },
  {
    id: 50,
    name: "Netherlands",
    capital: "Amsterdam",
    population: 17600000,
    flag: "https://flagcdn.com/w320/nl.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 51,
    name: "Belgium",
    capital: "Brussels",
    population: 11690000,
    flag: "https://flagcdn.com/w320/be.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 52,
    name: "Greece",
    capital: "Athens",
    population: 10680000,
    flag: "https://flagcdn.com/w320/gr.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 53,
    name: "Portugal",
    capital: "Lisbon",
    population: 10280000,
    flag: "https://flagcdn.com/w320/pt.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 54,
    name: "Sweden",
    capital: "Stockholm",
    population: 10500000,
    flag: "https://flagcdn.com/w320/se.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 55,
    name: "Switzerland",
    capital: "Bern",
    population: 8700000,
    flag: "https://flagcdn.com/w320/ch.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 56,
    name: "Norway",
    capital: "Oslo",
    population: 5500000,
    flag: "https://flagcdn.com/w320/no.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 57,
    name: "Denmark",
    capital: "Copenhagen",
    population: 5900000,
    flag: "https://flagcdn.com/w320/dk.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 58,
    name: "Finland",
    capital: "Helsinki",
    population: 5550000,
    flag: "https://flagcdn.com/w320/fi.png",
    continent: "Europe",
    created: new Date()
  },
  {
    id: 59,
    name: "Algeria",
    capital: "Algiers",
    population: 45600000,
    flag: "https://flagcdn.com/w320/dz.png",
    continent: "Africa",
    created: new Date()
  },
  {
    id: 60,
    name: "Sudan",
    capital: "Khartoum",
    population: 48100000,
    flag: "https://flagcdn.com/w320/sd.png",
    continent: "Africa",
    created: new Date()
  },
  {
    id: 61,
    name: "Tanzania",
    capital: "Dodoma",
    population: 65400000,
    flag: "https://flagcdn.com/w320/tz.png",
    continent: "Africa",
    created: new Date()
  },
  {
    id: 62,
    name: "Uganda",
    capital: "Kampala",
    population: 48500000,
    flag: "https://flagcdn.com/w320/ug.png",
    continent: "Africa",
    created: new Date()
  }
];

module.exports = countries;

