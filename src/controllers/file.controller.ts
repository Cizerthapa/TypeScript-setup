import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Person from '../models/user.model'; // Import the User model from your models directory
import { UploadedFile } from 'express-fileupload'; // Adjust based on your usage


export const uploadFile = (req: Request, res: Response) => {
    try {
        // 'avatar' is the name of the file field in the form
        const file = req.file; // Accessing the file directly from req.file
        console.log(file);

        if (!file) {
            return res.status(400).send('No file uploaded');
        }

        // You can access file information like this
        console.log('File uploaded:', file);

        // Respond with success
        res.status(200).send('File uploaded successfully');
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Server error');
    }
};
