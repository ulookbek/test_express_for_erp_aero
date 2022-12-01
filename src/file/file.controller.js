import FileService from './file.service'
import ApiError from '../../exceptions/apiError'

class FileController {
    async upload(req, res, next) {
        try {
            const file = await FileService.saveFileData(req.file)
            return res.json(file)
        } catch (e) {
            next(e)
        }
    }

    async filesList(req, res, next) {
        try {
            const { limit, offset } = req.query
            const data = await FileService.getFiles({ limit, offset })
            return res.json(data)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const data = await FileService.getFile({ id })
            return res.json(data)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async fileDownload(req, res, next) {
        try {
            const { id } = req.params
            const file = await FileService.getFile({ id, withSavedName: true })
            if (!file) {
                throw ApiError.BadRequest('Нет такого файла')
            }
            res.setHeader('Content-Type', file.mimeType)
            return res.download(
                `${process.cwd()}/uploads/${file.savedName}`,
                file.name
            )
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async deleteFile(req, res, next) {
        try {
            const { id } = req.params
            await FileService.deleteFile({ id })
            return res.json({ message: 'Файл успешно удалён!' })
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async updateFile(req, res, next) {
        try {
            const { id } = req.params
            const data = await FileService.updateFile({ ...req.file, id })
            return res.json({ message: 'Файл успешно обновлён!', ...data })
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async checkFile(req, res, next) {
        try {
            const { id } = req.params
            const data = await FileService.getFile({ id })
            if (!data) {
                throw ApiError.BadRequest('Нет такого файла')
            }
            next()
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

export default new FileController()
