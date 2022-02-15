import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    usuario: {
        admin: boolean
    }
}

export const ensureAdmin = () => {
    return (request: Request, response: Response, next: NextFunction) => {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response.status(401).send({ error: 'No token provided' });
        }

        const [, token] = authHeader.split(' ');

        try {
            console.log(verify(token, process.env.JWT_SECRET))
            const { usuario } = verify(token, process.env.JWT_SECRET) as IPayload


            if (usuario.admin) {
                return next()
            }
            else {
                return response.status(401).send({ error: 'Usuário não é administrador' })
            }
        } catch (err) {
            console.log(err)
            return response.status(401).end()
        }
    }
}