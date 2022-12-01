import sequelize from '../../db'
import { DataTypes } from 'sequelize'

const FileModel = (function () {
    return sequelize.define('File', {
        name: {
            type: DataTypes.STRING,
        },
        extension: {
            type: DataTypes.STRING,
        },
        mimeType: {
            type: DataTypes.STRING,
        },
        size: {
            type: DataTypes.INTEGER,
        },
        savedName: {
            type: DataTypes.STRING,
        },
    })
})()

export default FileModel
