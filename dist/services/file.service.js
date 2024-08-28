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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileService {
    constructor() {
        this.uploadDir = path_1.default.join(__dirname, '../uploads');
        if (!fs_1.default.existsSync(this.uploadDir)) {
            fs_1.default.mkdirSync(this.uploadDir, { recursive: true });
        }
    }
    // Save an uploaded file to the uploads directory
    uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path_1.default.join(this.uploadDir, file.name);
            return new Promise((resolve, reject) => {
                file.mv(filePath, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(filePath);
                });
            });
        });
    }
    // Retrieve the full path of a file by its filename
    getFilePath(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path_1.default.join(this.uploadDir, filename);
            return new Promise((resolve, reject) => {
                fs_1.default.access(filePath, fs_1.default.constants.F_OK, (err) => {
                    if (err) {
                        return resolve(null);
                    }
                    resolve(filePath);
                });
            });
        });
    }
    // List all files in the uploads directory
    listFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs_1.default.readdir(this.uploadDir, (err, files) => {
                    if (err) {
                        return reject('Could not list files');
                    }
                    resolve(files);
                });
            });
        });
    }
}
exports.FileService = FileService;
