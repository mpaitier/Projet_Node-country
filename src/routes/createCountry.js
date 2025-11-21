const { ValidationError } = require('sequelize');
const { Country } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.post('/api/countries', auth, (req, res) => {
        Country.create(req.body)
            .then(country => {
                const message = `The country ${country.title} has been created.`
                res.status(201).json({ message, data: country }) 
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    const messages = error.errors.map(e => e.message);
                    const message = `Invalid country data. Please verify the information provided.`;
                    return res.status(400).json({ message, data: messages });
                }

                const message = `The book couldn't be created. Please try again later.`;
                res.status(500).json({ message, data: error })
            })
    })
}