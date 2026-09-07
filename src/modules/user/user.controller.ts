import type {Request, Response} from 'express';
import {createUser} from './user.service.js';

export async function createUserController(
    req: Request,
    res: Response
) {
    try {;
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to create user'
        });
    }
}