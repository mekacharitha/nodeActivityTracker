const models = require('../../models')
const moment = require('moment')
var jwt = require('jsonwebtoken')
async function report(req, res, next) {
    try {
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
        let prevDates = [];
        let info = {}
        let output = []

        for (let i = 0; i < 7; i++) {
            let date = new Date();
            let prevdate = date.getDate() - i;
            date.setDate(prevdate)
            let nowDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            prevDates.push(nowDate)
        }

        for (i = 0; i < 7; i++) {
            let sum = 0;
            let obj = [];
            let c=0;

            const data = await models.Activities.findAll({
                where: {
                    userId: payload.userId,
                    date: prevDates[i]
                }
            })
            obj = [...JSON.parse(JSON.stringify(data, null, 4))]
            if (obj.length !== 0) {
                obj.map(act => {
                    if (act.endTime !== null)
                    {
                        c++
                        sum = sum + moment(act.endTime, "HH:mm:ss").diff(moment(act.startTime, "HH:mm:ss"))
                    }
                })
                info = {
                    date: prevDates[i], count: c, duration: sum
                }
                output.push(info)
                // console.log(obj.length)
                // console.log(sum)
                // console.log(info)
            }
            else {
                info = {
                    date: prevDates[i], count: 0, duration: 0
                }
                output.push(info)
            }

        }
        res.status(200).json({
            output
        })
    }
    catch (err) {
        next(err)
    }

}
module.exports = report;