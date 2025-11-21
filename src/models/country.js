module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Country', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Country name cannot be empty." },
        notNull: { msg: "Country name is required." },
        len: {
          args: [1, 100],
          msg: "Country name must be between 1 and 100 characters long."
        },
        // Allows letters, numbers, spaces, hyphens, and apostrophes (with accented characters)
        is: {
          args: /^[a-zA-Z0-9À-ÖØ-öø-ÿ \-']+$/i,
          msg: "Country name can only contain letters, numbers, spaces, hyphens, and apostrophes."
        }
      }
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Capital cannot be empty." },
        notNull: { msg: "Capital is required." },
        len: {
          args: [1, 100],
          msg: "Capital name must be between 1 and 100 characters long."
        },
        // Allows letters, spaces, hyphens, and apostrophes (with accented characters)
        is: {
          args: /^[a-zA-Z0-9À-ÖØ-öø-ÿ \-',.]+$/i,
          msg: "Capital name can only contain letters, spaces, hyphens, and apostrophes."
        }
      }
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Population must be an integer." },
        notNull: { msg: "Population is required." },
        min: 0, 
      }
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Flag URL cannot be empty." },
        notNull: { msg: "Flag URL is required." },
        isUrl: {
          msg: "The 'flag' field must contain a valid URL."
        }
      }
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Continent cannot be empty." },
        notNull: { msg: "Continent is required." },
        isContinentValid(value) {
          if (!value) {
            throw new Error("Continent is required.");
          }

          const validContinents = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Antarctica"];
          if (!validContinents.includes(value)) {
            throw new Error(`The continent '${value}' is not recognized. It must be one of the following: ${validContinents.join(', ')}.`);
          }
        }
      }
    }
  }, {
    // Timestamp management
    timestamps: true,
    createdAt: 'created', 
    updatedAt: 'updated'      
  });
}