const { Country } = require('../db/sequelize');
const auth = require('../auth/auth');

const DEFAULT_LIMIT = 5;
const MIN_LIMIT = 1;
const MAX_LIMIT = 20;

module.exports = (app) => {
    app.get('/api/countries/recent', auth, async (req, res) => {
        let limit = parseInt(req.query.limit, 10);

        const limitProvided = req.query.limit !== undefined;

        if (limitProvided && (isNaN(limit) || limit < MIN_LIMIT || limit > MAX_LIMIT)) {
            const message = `Limit must be between ${MIN_LIMIT} and ${MAX_LIMIT}.`;
            return res.status(400).json({ message });
        }
        
        if (isNaN(limit) || limit < MIN_LIMIT || limit > MAX_LIMIT) {
             limit = DEFAULT_LIMIT;
        }

        try {
            const recentCountries = await Country.findAll({
                attributes: ['id', 'name', 'population', 'capital', 'continent', 'flag', 'created'], 
                order: [['created', 'DESC']],
                limit: limit
            });

            const count = recentCountries.length;
            let message;
            
            if (count > 0) {
                message = `Recent ${count} countries retrieved successfully.`;
            } else {
                message = "No recent countries found.";
            }

            return res.status(200).json({ message, data: recentCountries });

        } catch (error) {
            console.error(`Error retrieving recent countries with limit ${limit}:`, error);

            const errorMessage = "The recent countries could not be retrieved. Please try again later.";
            res.status(500).json({ message: errorMessage, error: error.message });
        }
    });
};
