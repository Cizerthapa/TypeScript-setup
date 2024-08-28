import { Request, Response } from 'express';
import { FileService } from '../services/file.service';
import { UploadedFile } from 'express-fileupload';

class FileController {
    constructor(private fileService: FileService) {}

    // Handle file upload
    async uploadFile(req: Request, res: Response): Promise<Response> {
        try {
            const file = req.files?.file as UploadedFile;

            if (!file) {
                return res.status(400).send('No file uploaded.');
            }

            const fileData = await this.fileService.uploadFile(file);
            return res.status(201).json({ message: 'File uploaded successfully', data: fileData });
        } catch (error) {
            console.error(error);
            return res.status(500).send('An error occurred while uploading the file.');
        }
    }

    // Handle file download
    async downloadFile(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const filePath = await this.fileService.getFilePath(id);

            if (!filePath) {
                res.status(404).send('File not found.');
                return;
            }

            res.download(filePath);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while downloading the file.');
        }
    }

    // List all files
    async listFiles(req: Request, res: Response): Promise<Response> {
        try {
            const files = await this.fileService.listFiles();
            return res.status(200).json(files);
        } catch (error) {
            console.error(error);
            return res.status(500).send('An error occurred while retrieving files.');
        }
    }
}
export default FileController;