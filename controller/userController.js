const db = require('../models')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const { checkPassword } = require('../helper/bycryptHelper');
const { salt } = require('../helper/bycryptHelper')

class UserController {
    static async register(req, res, next) {
        try {
            const { username, password } = req.body;
            const hashPassword = await salt(password).catch(err => {
                return res.status(500).send('password encryption failed')
            })
            const user = await db.users.create({
                username,
                password: hashPassword,
            })

            delete user.dataValues.password
            res.send(user)
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            let getUser = await db.users.findAll({
                where: {
                    username: req.body.username
                }
            })

            if (getUser.length === 0) {
                res.status(404).send("User is not available")
            }
            else {
                const user = getUser[0]
                const isPassMatch = await checkPassword(req.body.password, user.dataValues.password)
                if (!isPassMatch) {
                    res.status(400).send("Wrong Password, Please don't be account mafia :D")
                } else {
                    const token = jwt.sign(user.dataValues, secret, {
                        expiresIn: '365d'
                    })
                    user.dataValues.token = token
                    delete user.dataValues.password
                    res.send(user.dataValues)
                }
            }
        } catch (err) {
            next(err);
        }
    }
}
module.exports = UserController;
