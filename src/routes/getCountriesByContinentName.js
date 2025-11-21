const { Country } = require('../db/sequelize');
const auth = require('../auth/auth');
const { Op } = require('sequelize'); 

const VALID_CONTINENTS = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Antarctica"];

module.exports = (app) => {
    app.get('/api/countries/by-continent/:continent', auth, async (req, res) => {
        const requestedContinent = req.params.continent;

        if (!VALID_CONTINENTS.includes(requestedContinent)) {
            const message = `Invalid continent. Must be one of: ${VALID_CONTINENTS.join(', ')}`;
            return res.status(400).json({ message });
        }

        try {
            
            const countries = await Country.findAll({
                where: {
                    continent: requestedContinent
                },
                order: [['name', 'ASC']]
            });

            const count = countries.length;
            let message;
            
            if (count > 0) {
                message = `${count} countries found in ${requestedContinent}.`;
            } else {
                message = `No countries found in ${requestedContinent}.`;
            }

            return res.status(200).json({ message, data: countries });

        } catch (error) {
            console.error(`Error retrieving countries for continent ${requestedContinent}:`, error);

            const errorMessage = "The countries could not be retrieved. Please try again later.";
            res.status(500).json({ message: errorMessage, error: error.message });
        }
    });
};