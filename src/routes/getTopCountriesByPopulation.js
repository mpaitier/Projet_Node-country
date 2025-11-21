const { Country } = require('../db/sequelize');
const auth = require('../auth/auth');

const DEFAULT_LIMIT = 10;
const MIN_LIMIT = 1;
const MAX_LIMIT = 50;

module.exports = (app) => {
    app.get('/api/countries/population/top', auth, async (req, res) => {
        let limit = parseInt(req.query.limit, 10);

        if (isNaN(limit) || limit < MIN_LIMIT || limit > MAX_LIMIT) {
            if (req.query.limit !== undefined) {
                const message = `Limit must be between ${MIN_LIMIT} and ${MAX_LIMIT}.`;
                return res.status(400).json({ message });
            }
            limit = DEFAULT_LIMIT;
        }


        try {
            const topCountries = await Country.findAll({
                attributes: ['id', 'name', 'population', 'capital', 'continent', 'flag'], 
                order: [['population', 'DESC']],
                limit: limit
            });

            const count = topCountries.length;
            let message;
            
            if (count > 0) {
                message = `Top ${count} countries by population retrieved successfully.`;
            } else {
                message = "No countries found.";
            }
            
            const formattedCountries = topCountries.map(country => ({
                ...country.get({ plain: true }),
                population: country.population.toLocaleString('en-US')
            }));
            return res.status(200).json({ message, data: formattedCountries });
            
        } catch (error) {
            console.error(`Error retrieving top populated countries with limit ${limit}:`, error);

            // 5. Réponse d'erreur (500 Internal Server Error)
            const errorMessage = "The top countries could not be retrieved. Please try again later.";
            res.status(500).json({ message: errorMessage, error: error.message });
        }
    });
};