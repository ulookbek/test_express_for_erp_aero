import sequelize from '../../db'
import { DataTypes } from 'sequelize'
import UserModel from '../user/user.model'

const AuthModel = (function () {
    return sequelize.define('Auth', {
        user: {
            type: DataTypes.INTEGER,

            references: {
                model: UserModel,
                key: 'id',
            },
        },
        refreshToken: {
            type: DataTypes.STRING,
        },
    })
})()

export default AuthModel