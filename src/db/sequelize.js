const { Sequelize, DataTypes } = require('sequelize')
const CountryModel = require('../models/country')
const UserModel = require('../models/user')
const country = require('./mock-country')
const bcrypt = require('bcrypt')
// to use secret variable
const dotenv = require('dotenv')
dotenv.config()
  
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
    host: "localhost",
    dialect: "mysql",
    logging: false
    }
)
  
const Country = CountryModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
  
const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        country.map(country => {
            Country.create({
                // id is auto incremented
                name: country.name,
                capital: country.capital,
                population: country.population,
                flag: country.flag,
                continent: country.continent
            }).then(countryInstance => console.log(countryInstance.toJSON()))
        })
        
        bcrypt.hash('azerty', 10)
        .then(hash => {
            return User.create({
                username: 'teiva',
                password: hash
            })
        })
        .then(user => console.log(user.toJSON()))

        console.log('The database has been sync and initialized with countries!')
    })
}
  
module.exports = { 
  initDb, Country: Country, User
}
