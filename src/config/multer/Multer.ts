import multer from 'multer';
import { v4 } from 'uuid';

abstract class Multer {
  abstract storage: any;
  private multerInstance: any;

  public getInstance(): multer.Multer {
    if (!this.multerInstance) {
      this.multerInstance = multer({
        storage: this.storage,
      });
    }

    return this.multerInstance;
  }

  public generateFileName(file: Express.Multer.File): string | boolean {
    const extPattern = /(jpg|jpeg|png|gif|svg)/gi.test(file.mimetype);
    const extension = file.mimetype.replace('image/', '');

    if (extPattern) {
      const fileName = `${v4()}.${extension}`;

      return fileName;
    }

    return false;
  }
}

export { Multer };
