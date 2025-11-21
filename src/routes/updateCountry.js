const { Country } = require('../db/sequelize')
const auth = require('../auth/auth');

module.exports = (app) => {
    app.put('/api/countries/:id', auth, (req,res) => {
        const id = req.params.id
        Country.update(req.body, { where: {id: id} })
            .then(() => {
                return Country.findByPk(id)
            })
            .then(country => {
                if(!country){
                    const message = "The requested country does not exist. Try another identifier."
                    return res.status(404).json({message})
                }

                const message = `The country ${country.title} has been modified.`
                res.json({message, data: country})
            })
            .catch(error => {
                if (error.name === 'SequelizeValidationError') {
                    const message = `Invalid country data. Please verify the information provided.`
                    return res.status(400).json({ message, data: error.errors.map(e => e.message) })
                }
                
                if (error.name === 'SequelizeUniqueConstraintError') {
                    const message = `Name must be unique. A country with this name already exists.`
                    return res.status(409).json({ message, data: error.errors.map(e => e.message) })
                }
                
                const message = `The country couldn't be modified. Please try again later.`;
                res.status(500).json({ message, data: error })
            })
    })
}
