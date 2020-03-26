const models = require('../../models')
var jwt = require('jsonwebtoken')
var moment = require('moment')
const { Op } = require('sequelize')

const report = async (req, res, next) => {
    try {
        const token = req.headers['access-token']
        const payload = jwt.decode(token)

        const data = await models.Activities.findAll({
            where: {
                userId: payload.userId,
                date: {
                    [Op.gte]: moment().subtract(7, 'days').toDate()
                }
            }
        })
        console.log(moment().subtract(1, 'days').toDate())
        let j = 0
        let result = []
        let diff, duration
        for (j = 0; j < 7; j++) {
            let count = 0
            duration = 0
            date = moment().subtract(j, 'days').toDate()
            for (let i in data) {
                if (moment(data[i].date).format('L') === moment(date).format('L') && data[i].endTime !== null) {

                    count++
                    diff = moment(data[i].endTime, "HH:mm:ss").diff(moment(data[i].startTime, "HH:mm:ss"))
                    duration = duration + diff

                }
            }
            result.push({
                date: moment(date).format('L'),
                count: count,
                duration: duration,
            })
        }
        console.log(result)
        if (data) {
            res.status(200).json({
                result
            })
        }
    }
    catch (error) {
        res.status(400).json({
            status: false,
            error,
        })
    }
}
module.exports = report;