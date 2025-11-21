const { Country } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.get('/api/countries/continents', auth, async (req, res) => {
        const dbInstance = Country.sequelize;

        try {
            if (!dbInstance) {
                throw new Error("Sequelize instance is not available on the Country model.");
            }

            const continentCounts = await Country.findAll({
                attributes: [
                    'continent',
                    [dbInstance.fn('COUNT', dbInstance.col('id')), 'countryCount']
                ],
                group: ['continent'],
                order: [['continent', 'ASC']]
            });

            const formattedContinents = continentCounts.map(item => ({
                name: item.continent, 
                count: parseInt(item.dataValues.countryCount, 10)
            }));
            
            let message;
            if (formattedContinents.length > 0) {
                message = "Continents retrieved successfully.";
            } else {
                message = "No continents found.";
            }

            return res.status(200).json({ message, data: formattedContinents });

        } catch (error) {
            console.error('Error retrieving continent list:', error);

            const errorMessage = "The continents list could not be retrieved. Please try again later.";
            res.status(500).json({ message: errorMessage, error: error.message });
        }
    });
};