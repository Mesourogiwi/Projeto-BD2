import { Usuarios } from "../models/Usuarios";
import { Enderecos } from "../models/Enderecos";
import { Request, Response } from "express";

export class UsuariosController {
    async index(request: Request, response: Response) {
        try {
            //@ts-ignore
            const result = await Usuarios.findAll({
                include: [
                    { model: Enderecos }
                ],
                attributes: {
                    exclude: ['senha']
                }
            });

            return response.json(result)
        } catch (err) {
            throw new Error(err)
        }
    }

    async edit(request: Request, response: Response) {
        const { nome, email, senha, cpf, endereco } = request.body;
        const { id_usuario } = request.params;

        try {
            //@ts-ignore
            const result = await Usuarios.findByPk(id_usuario)

            const afterUpdate = await result.update({
                nome,
                email,
                senha,
                cpf,
                endereco
            })

            return response.json(afterUpdate)
        } catch (err) {
            throw new Error(err)
        }
    }

    async destroy(request: Request, response: Response) {
        const { id_usuario } = request.params

        //@ts-ignore
        const result = await Usuarios.findByPk(id_usuario)

        //@ts-ignore
        await result.destroy(result)

        return response.json()
    }
}