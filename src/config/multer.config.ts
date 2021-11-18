import { MulterLocal } from './multer/MulterLocal';

const multerProvider = () => {
  switch(process.env.STORAGE_TYPE) {
    case 'LOCAL':
      return new MulterLocal();
    default: 
      return new MulterLocal();
  }
}

export { multerProvider };
