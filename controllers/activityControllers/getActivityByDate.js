const models = require('../../models')
var jwt = require('jsonwebtoken')

const getActivitiesByDate = async (req, res, next) => {
    try {
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
        // const user = await models.Users.findOne({
        //     where: {
        //         username: payload.username
        //     }
        // })
        const data = await models.Activities.findAll({
            where: {
                userId: payload.userId,
                date:req.params.date,
            }
        })
        res.status(200).json({
            success:true,
            data
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}
module.exports = getActivitiesByDate;