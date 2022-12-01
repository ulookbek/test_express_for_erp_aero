import ApiError from '../exceptions/apiError'

// eslint-disable-next-line
function errorMiddleware(err, req, res, next) {
    if (err instanceof ApiError) {
        return res
            .json({ message: err.message, errors: err.errors })
            .status(err.status)
    }
    return res.status(500).json({ message: 'Непредвиденная ошибка' })
}

export default errorMiddleware
