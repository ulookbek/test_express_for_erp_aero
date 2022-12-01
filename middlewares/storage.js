import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const name = uuidv4()
        file.savedName = name
        cb(null, name)
    },
})
export default multer({ storage: storage })
