const { Country } = require('../db/sequelize')
const auth = require('../auth/auth');

module.exports = (app) => {
    app.delete('/api/countries/:id', auth, (req, res) => {
        const id = req.params.id;

        Country.findByPk(id)
            .then(country => {
                // incorrect identifier
                if (!country) {
                    const message = "The requested country does not exist. Try another identifier."
                    return res.status(404).json({ message })
                }
                
                // correct identifier
                const countryDeleted = country;
                
                return country.destroy()
                    .then(() => {
                        const message = `The country (ID n°${countryDeleted.id}, Name: "${countryDeleted.name}") has been successfully deleted.`
                        res.status(200).json({ message, data: countryDeleted })
                    })
            })
            .catch(error => { 
                const message = `The country couldn't be deleted. Please try again later.`;
                res.status(500).json({ message, data: error.message || error })
            })
    })
}