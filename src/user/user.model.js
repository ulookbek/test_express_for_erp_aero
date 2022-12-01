import sequelize from '../../db'
import { DataTypes } from 'sequelize'

const UserModel = (function () {
    return sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
    })
})()

export default UserModel
