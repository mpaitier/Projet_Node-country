const { Country } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.get('/api/countries/:id', auth, (req, res) => {
        const id = parseInt(req.params.id);

        Country.findByPk(id)
            .then(country => {
                
                if(country === null) {
                    const message = `The country hasn't been found. Please try another identifier.`;
                    return res.status(404).json({ message })
                }
                else {
                    const message = `The country ${country.title} has been found.`
                    res.status(200).json({ message, data: country })
                }
            })
            .catch(error => {
                const message = `The country couldn't be retrieved. Please try again later.`;
                res.status(500).json({ message, data: error })
            })
    })
}