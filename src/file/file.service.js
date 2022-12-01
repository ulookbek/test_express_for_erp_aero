import FileModel from './file.model'
import fileExtension from 'file-extension'
import { FileDto } from './file.dto'
import { unlink } from 'fs'
import ApiError from '../../exceptions/apiError'

const unlinkAsync = function (filename) {
    return new Promise(function (resolve, reject) {
        unlink(filename, function (err, data) {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

class FileService {
    async saveFileData({ originalname, mimetype, size, savedName }) {
        const extension = fileExtension(originalname)
        const file = await FileModel.create({
            name: originalname,
            extension,
            mimeType: mimetype,
            size,
            savedName,
        })
        return new FileDto(file)
    }

    async updateFile({ originalname, mimetype, size, savedName, id }) {
        const extension = fileExtension(originalname)
        const found = await FileModel.findByPk(id)
        await unlinkAsync(`${process.cwd()}/uploads/${found.savedName}`)

        const updated = await FileModel.update(
            {
                name: originalname,
                extension,
                mimeType: mimetype,
                size,
                savedName,
            },
            { where: { id } }
        )
        return new FileDto(updated)
    }

    async getFiles({ limit = 10, offset = 0 }) {
        return await FileModel.findAndCountAll({
            limit,
            offset,
            attributes: { exclude: ['savedName'] },
        })
    }

    async getFile({ id, withSavedName = false }) {
        return await FileModel.findByPk(id, {
            attributes: { exclude: !withSavedName ? ['savedName'] : [] },
        })
    }

    async deleteFile({ id }) {
        const found = await FileModel.findByPk(id)
        if (!found) {
            throw ApiError.BadRequest('Нет такого файла')
        }
        await FileModel.destroy({ where: { id } })
        await unlinkAsync(`${process.cwd()}/uploads/${found.savedName}`)
    }
}

export default new FileService()
