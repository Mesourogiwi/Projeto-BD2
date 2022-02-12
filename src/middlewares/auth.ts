
import 'dotenv/config'
import { verify, decode } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

interface IPayload {
    sub: string
}

export const ensuredAuthenticated = () => {
    return async (request: Request, response: Response, next: NextFunction) => {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response.status(401).send({ error: 'No token provided' });
        }

        const [, token] = authHeader.split(' ');

        try {
            const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

            console.log(verify(token, process.env.JWT_SECRET))

            request.id_cliente = sub.toString()

            return next()
        } catch (err) {
            console.log(err)
            return response.status(401).end()
        }
    }
}
