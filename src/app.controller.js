import { Router } from 'express'

// controllers
import userController from './user/user.controller.js'
import fileController from './file/file.controller.js'

// middlewares
import authMiddleware from '../middlewares/auth'
import storageMiddleware from '../middlewares/storage'

const router = new Router()

router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.post('/signin/new_token', userController.newToken)

router.post(
    '/file/upload',
    authMiddleware,
    storageMiddleware.single('file'),
    fileController.upload
)
router.get('/file/list', authMiddleware, fileController.filesList)
router.get('/file/download/:id', authMiddleware, fileController.fileDownload)
router.get('/file/:id', authMiddleware, fileController.getOne)
router.delete('/file/delete/:id', authMiddleware, fileController.deleteFile)
router.put(
    '/file/update/:id',
    authMiddleware,
    fileController.checkFile,
    storageMiddleware.single('file'),
    fileController.updateFile
)

router.get('/info', authMiddleware, userController.info)
router.get('/logout', authMiddleware, userController.logout)

export default router
