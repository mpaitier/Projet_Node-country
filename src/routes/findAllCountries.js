const { Country } = require('../db/sequelize')
const { Op } = require('sequelize');
const auth = require('../auth/auth');
const minLength = 2;

module.exports = (app) => {
    app.get('/api/countries', auth, (req, res) => {
        
        const maxResults = parseInt(req.query.limit) || 10;
        
        if (req.query.name) {
            const name = req.query.name

            if (name.length < minLength) {
                const message = `Search term must contain at least ${minLength} characters.`;
                return res.status(400).json({ message });
            }
            
            return Country
                .findAndCountAll({
                    where: { name: { [Op.like]: `%${name}%` } },
                    order: [['name', 'ASC']],
                    limit: maxResults
                })
                .then(({ count, rows }) => {
                    const message = `There are ${count} countries matching with the search term '${name}'.`
                    res.status(200).json({ message, data: rows })
                })
                .catch(error => {
                    const message = `The list of countries could not be retrieved. Please try again later.`
                    res.status(500).json({ message, data: error })
                })
        }
        
        else {
            Country.findAll({order : [['name', 'ASC']]})
            .then(countries => {
                const message = 'The list of countries has been retrieved.'
                res.status(200).json({ message, data: countries })
            })
            .catch(error => {
                const message = `The list of countries could not be retrieved. Please try again later.`
                res.status(500).json({ message, data: error })
            })
        }
    }) 
}