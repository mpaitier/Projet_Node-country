module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique : { msg : "The user already exist." }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : { msg : "The user name already taken." },
        validate : {
            notEmpty: { msg: "User name can't be empty." },
            notNull: { msg: "User name is required." },
            len : {
            args : [1, 100],
            msg : "User name must be between 1 and 100 characters long."
            },
            is : { 
            args : /^[a-zA-Z0-9À-ÖØ-öø-ÿ0-9 \-']+$/i,
            msg : "User name can only contain letters, spaces, hyphens, and apostrophes."
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: { msg: "Password can't be empty." },
            notNull: { msg: "Password is required." }           
        }
    }
}, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated'
  })
}