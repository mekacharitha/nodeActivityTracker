const models = require('../../models');
const jwt = require('jsonwebtoken');

const addActivity = async (req, res, next) => {
    try {
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
        // const user = await models.Users.findOne({
        //     where: {
        //         //username: payload.username,
        //     }
        // })
        const activity = { 
             
            userId: payload.userId,
            ...req.body,
        }
        const act = await models.Activities.create(activity)
        res.status(201).json({
            success:true,
            act,
            userId : payload.userId,
        })
    }
    catch (error) {
        res.status(400).json({
            status: false,
            message:"could not add activity",
            error
        })
    }
}
module.exports = addActivity;