const User = require('../../model/User')

async function userSQL(user_id) {
    return await User.findByPk(user_id, {
        attributes: {
            exclude: ['password', 'email', 'updatedAt'],
        }, include: {
            association : 'animes', 
            attributes: ['name', 'id'],
            through: { 
                attributes: []
              }}
    })
}

module.exports = userSQL