// src/types/express.d.ts

import { Request } from 'express';
import { Person } from '../models/user.model'; // Adjust the path to your model file

declare global {
  namespace Express {
    interface Request {
      person?: Person; // Add this line to extend the Request type
    }
  }
}
/*
    express.d.ts is a TypeScript declaration file that helps TypeScript understand 
    the types used by the express library. This is important for TypeScript to 
    provide accurate type checking and autocompletion.
*/