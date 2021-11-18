import multer, { StorageEngine } from 'multer'
import { Request } from 'express';
import { resolve } from 'path'

import { Multer } from "./Multer";

class MulterLocal extends Multer {
  storage: StorageEngine;

  constructor() {
    super();
    this.storage = multer.diskStorage({
      destination: (req: Request, file: Express.Multer.File, done): void => {
        if (!file) {
          done(new Error('Upload file error'), '');
        } else {
          done(null, resolve(process.cwd(), 'upload/'));
        }
      },
      filename: (req: Request, file: Express.Multer.File, done) => {
        if (file) {
          const fileName = this.generateFileName(file);

          if (!fileName) {
            return done(new TypeError('File format is not valid'), file.originalname);            
          }
          
          return done(null, fileName as string);
        }
      }
    });
  }
}

export { MulterLocal };
