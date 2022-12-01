import UserModel from './user.model'
import bcrypt from 'bcrypt'
import AuthService from '../auth/auth.service'
import { UserDto } from './user.dto'
import ApiError from '../../exceptions/apiError'

class UserService {
    async register(email, password) {
        const userIsExist = await UserModel.findOne({ where: { email } })
        if (userIsExist) {
            throw ApiError.BadRequest(
                `Пользователь с почтовым адресом ${email} уже существует`
            )
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserModel.create({ email, password: hashPassword })

        const userDto = new UserDto(user)
        const tokens = await AuthService.generateToken({ ...userDto })
        await AuthService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }

    async login(email, password) {
        const user = await UserModel.findOne({ where: { email } })
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный логин или пароль')
        }
        const userDto = new UserDto(user)
        const tokens = await AuthService.generateToken({ ...userDto })

        await AuthService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        return await AuthService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = AuthService.validateRefreshToken(refreshToken)
        const tokenFromDb = await AuthService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findByPk(userData.id)
        const userDto = new UserDto(user)
        const tokens = await AuthService.generateToken({ ...userDto })

        await AuthService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }
}

export default new UserService()
