import { Administradores } from "../models/Administradores";
import { Request, Response } from "express";

export class AdministradoresController {
    async index(request: Request, response: Response) {
        try {
            //@ts-ignore
            const result = await Administradores.findAll();

            return response.json(result)
        } catch (err) {
            throw new Error(err)
        }
    }

    async store(request: Request, response: Response) {
        const { nome, email, senha } = request.body;

        try {
            if (!nome || !email || !senha) {
                return response.status(400).json('Preencha os campos')
            }
            //@ts-ignore
            if (await Administradores.findOne({
                where: {
                    email
                }
            })) {
                return response.status(400).json('Esse email já está cadastrado!')
            }
            //@ts-ignore
            const result = await Administradores.create({ nome, email, senha })

            return response.json(result)
        } catch (err) {
            throw new Error(err)
        }
    }

    async edit(request: Request, response: Response) {
        const { nome, email, senha } = request.body;
        const { id_administrador } = request.params;

        try {
            //@ts-ignore
            const result = await Administradores.findByPk(id_administrador)

            const afterUpdate = await result.update({
                nome,
                email,
                senha
            })

            return response.json(afterUpdate)
        } catch (err) {
            throw new Error(err)
        }
    }

    async destroy(request: Request, response: Response) {
        const { id_administrador } = request.params

        //@ts-ignore
        const result = await Administradores.findByPk(id_administrador)

        //@ts-ignore
        await result.destroy(result)

        return response.json()
    }
}