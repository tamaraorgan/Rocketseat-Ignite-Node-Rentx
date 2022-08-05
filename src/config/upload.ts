import bcryptjs from 'bcryptjs'
import multer from 'multer'
import { resolve } from 'path'

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", folder),
                filename: (request, file, callback) => {
                    const fileHash = bcryptjs.setRandomFallback(16);
                    const fileName = `${fileHash}-${file.originalname}`;


                    return callback(null, fileName);
                }
            })
        }
    }
}
