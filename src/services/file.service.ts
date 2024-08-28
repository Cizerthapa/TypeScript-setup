import fs from 'fs';
import path from 'path';
import { UploadedFile } from 'express-fileupload';

export class FileService {
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.join(__dirname, '../uploads');

    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  // Save an uploaded file to the uploads directory
  public async uploadFile(file: UploadedFile): Promise<string> {
    const filePath = path.join(this.uploadDir, file.name);

    return new Promise((resolve, reject) => {
      file.mv(filePath, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(filePath);
      });
    });
  }

  // Retrieve the full path of a file by its filename
  public async getFilePath(filename: string): Promise<string | null> {
    const filePath = path.join(this.uploadDir, filename);

    return new Promise((resolve, reject) => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          return resolve(null);
        }
        resolve(filePath);
      });
    });
  }

  // List all files in the uploads directory
  public async listFiles(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(this.uploadDir, (err, files) => {
        if (err) {
          return reject('Could not list files');
        }
        resolve(files);
      });
    });
  }
}
