const { Country } = require('../db/sequelize')
const { Op } = require('sequelize');
const auth = require('../auth/auth');
const minLength = 2;

module.exports = (app) => {
    app.get('/api/countries', auth, (req, res) => {
        
    const maxResults = parseInt(req.query.limit) || 10;
        if(req.query.name) {
            const name = req.query.name

            if(name.length >= minLength) {
                return Country
                    .findAndCountAll({
                        where: {name: {[Op.like]: `%${name}%`}},
                        order: [['name', 'ASC']],
                        limit: maxResults
                    })
                    .then(({count, rows}) => {
                        const message = `There are ${count} countries matching with the search term '${name}'.`
                        res.status(200).json({message, data: rows})
                    })
                    .catch(error => {
                    const message = `The list of countries could not be retrieved. Please try again later.`
                    res.status(500).json({message, data: error})
                    })
            }
                
        }
        
        else {
            Country.findAll()
            .then(books => {
                const message = 'The list of books has been retrieved.'
                res.status(200).json({message, data: books})
            })
            .catch(error => {
                const message = `The list of countries could not be retrieved. Please try again later.`
                res.status(500).json({message, data: error})
            })
        }
        
    }) 
}