const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        
        User.findOne({ where: { username: req.body.username } })
        .then(user => {

            if(!user) {
                const message = `The user with username ${req.body.username} does not exist.`
                return res.status(404).json({ message })
            }

            bcrypt.compare(req.body.password, user.password)
            .then(isPasswordValid => {
                if(isPasswordValid) {
                    const token = jwt.sign({ userId: user.id }, privateKey, { expiresIn: '24h' })

                    const message = `User ${user.username} successfully logged in.`
                    res.json({ message, data: user, token })
                }
                else {
                    const message = `Incorrect password. Please try again.`
                    res.status(401).json({ message, token })
                }
            })
        })
        .catch(() => {
            const message = `The user could not be logged in. Please try again later.`
            res.json({ message })
        })
    })
}
