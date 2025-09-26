import { Injectable } from '@nestjs/common';
import { DeleteApiResponse, UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
    async uploadImage(file: Express.Multer.File) : Promise<UploadApiResponse | UploadApiErrorResponse> {

        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream({folder : 'User_Profile'}, (error, result) =>{
                if(error) return reject(error);

                if(!result){
                    return reject(new Error('No result from Cloudinary'));
                }

                resolve(result);
            })

            toStream(file.buffer).pipe(upload);
        });
    }

    async deleteImage(publicId: string) : Promise<DeleteApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            v2.uploader.destroy(publicId, (error, result) => {
                if (error) return reject(error);

                resolve(result);
            });
        });
    }
}
