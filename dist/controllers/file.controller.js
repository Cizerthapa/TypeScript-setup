"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    // Handle file upload
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
                if (!file) {
                    return res.status(400).send('No file uploaded.');
                }
                const fileData = yield this.fileService.uploadFile(file);
                return res.status(201).json({ message: 'File uploaded successfully', data: fileData });
            }
            catch (error) {
                console.error(error);
                return res.status(500).send('An error occurred while uploading the file.');
            }
        });
    }
    // Handle file download
    downloadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const filePath = yield this.fileService.getFilePath(id);
                if (!filePath) {
                    res.status(404).send('File not found.');
                    return;
                }
                res.download(filePath);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('An error occurred while downloading the file.');
            }
        });
    }
    // List all files
    listFiles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = yield this.fileService.listFiles();
                return res.status(200).json(files);
            }
            catch (error) {
                console.error(error);
                return res.status(500).send('An error occurred while retrieving files.');
            }
        });
    }
}
exports.default = FileController;
