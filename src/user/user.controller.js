import UserService from './user.service'
import { validationResult } from 'express-validator'
import ApiError from '../../exceptions/apiError'

class UserController {
    async signUp(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка при валидации', errors.array())
                )
            }
            const { email, password } = req.body
            const userData = await UserService.register(email, password)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async signIn(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await UserService.login(email, password)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.body
            await UserService.logout(refreshToken)
            return res.json({ success: true })
        } catch (e) {
            next(e)
        }
    }

    async info(req, res, next) {
        try {
            return res.json({ id: req?.user?.id })
        } catch (e) {
            next(e)
        }
    }

    async newToken(req, res, next) {
        try {
            const { refreshToken } = req.body
            const userData = await UserService.refresh(refreshToken)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()
