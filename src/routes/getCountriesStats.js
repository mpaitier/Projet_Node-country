const { Country } = require('../db/sequelize'); 
const auth = require('../auth/auth');

module.exports = (app) => {
    app.get('/api/countries/stats', auth, async (req, res) => {
        const message = "Statistics retrieved successfully.";

        const dbInstance = Country.sequelize;

        try {
            if (!dbInstance) {
                 throw new Error("Sequelize instance is not available on the Country model.");
            }

            const queries = [
                // total
                Country.count(),
                // total population
                Country.sum('population'),
                // by continent
                Country.findAll({
                    attributes: [
                        'continent',
                        [dbInstance.fn('COUNT', dbInstance.col('id')), 'count']
                    ],
                    group: ['continent'],
                    order: [[dbInstance.col('count'), 'DESC']]
                }),
                // most populated country
                Country.findOne({
                    attributes: ['name', 'population'],
                    order: [['population', 'DESC']],
                    limit: 1
                }),
                // least populated country
                Country.findOne({
                    attributes: ['name', 'population'],
                    order: [['population', 'ASC']],
                    limit: 1
                })
            ];

            const [
                totalCount,
                totalPopulation,
                continentCounts,
                mostPopulatedCountry,
                leastPopulatedCountry
            ] = await Promise.all(queries);

            const byContinentObject = continentCounts.reduce((acc, item) => {
                acc[item.continent] = parseInt(item.dataValues.count, 10);
                return acc;
            }, {});

            const statistics = {
                total: totalCount, 
                
                totalPopulation: (totalPopulation || 0).toLocaleString('en-US'), 
                byContinent: byContinentObject,
                
                mostPopulated: mostPopulatedCountry ? {
                    name: mostPopulatedCountry.name,
                    population: (mostPopulatedCountry.population || 0).toLocaleString('en-US')
                } : null,
                
                leastPopulated: leastPopulatedCountry ? {
                    name: leastPopulatedCountry.name,
                    population: (leastPopulatedCountry.population || 0).toLocaleString('en-US')
                } : null,
            };
            
            return res.status(200).json({ message, data: statistics });

        } catch (error) {
            console.error('Error retrieving country statistics:', error);

            const errorMessage = "The statistics could not be retrieved. Please try again later.";
            res.status(500).json({ message: errorMessage, error: error.message });
        }
    });
};