const models = require('../../models');

const signUp = async (req, res, next) => {
    try {
        const data = await models.Users.findAll({
            where: {
                username: req.body.username
            }
        })

        if (Object.values(data).length == 0) {
            const user = await models.Users.create(req.body)
            res.status(201).json({
                success: true,
                user
            })
        }
        // res.status(201).send(
        //     user
        // );
        else {
            res.status(400).json(
                {
                    message: "username already exists",
                    data
                }
            )
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "could not signup",
            error
        })
    }
}

module.exports = signUp;
