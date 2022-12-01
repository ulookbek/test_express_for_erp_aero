import jwt from 'jsonwebtoken'
import AuthModel from './auth.model'

class AuthService {
    async generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: '10m',
        })
        const refreshToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: '1d',
        })
        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(userId, refreshToken) {
        const foundToken = await AuthModel.findOne({ where: { user: userId } })
        if (foundToken) {
            foundToken.refreshToken = refreshToken
            return foundToken.save()
        }
        return await AuthModel.create({ user: userId, refreshToken })
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.TOKEN_SECRET)
        } catch (e) {
            return null
        }
    }

    async removeToken(refreshToken) {
        return await AuthModel.destroy({ where: { refreshToken } })
    }

    async findToken(refreshToken) {
        return await AuthModel.findOne({ where: { refreshToken } })
    }
}

export default new AuthService()
