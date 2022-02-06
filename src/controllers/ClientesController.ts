import { Clientes } from "../models/Clientes";
import { Enderecos } from "../models/Enderecos";
import { Request, Response } from "express";

export class ClientesController {
    async index(request: Request, response: Response) {
        try {
            //@ts-ignore
            const result = await Clientes.findAll({
                include: [
                    { model: Enderecos }
                ]
            });

            return response.json(result)
        } catch (err) {
            throw new Error(err)
        }
    }

    async store(request: Request, response: Response) {
        const { nome, email, senha, cpf, endereco } = request.body;

        try {
            if (!nome || !email || !senha || !cpf || endereco) {
                return response.status(400).json('Preencha os campos')
            }
            //@ts-ignore
            if (await Clientes.findOne({
                where: {
                    email
                }
            })) {
                return response.status(400).json('Esse email ja está cadastrado!')
            }
            //@ts-ignore
            if (await Clientes.findOne({
                where: {
                    cpf
                }
            })) {
                return response.status(400).json('Esse cpf ja está cadastrado!')
            }
            //@ts-ignore
            const result = await Clientes.create({ nome, email, senha, cpf, endereco })

            return response.json(result)
        } catch (err) {
            throw new Error(err)
        }
    }

    async edit(request: Request, response: Response) {
        const { nome, email, senha, cpf, endereco } = request.body;
        const { id_cliente } = request.params;

        try {
            //@ts-ignore
            const result = await Clientes.findByPk(id_cliente)

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
        const { id_cliente } = request.params

        //@ts-ignore
        const result = await Clientes.findByPk(id_cliente)

        //@ts-ignore
        await result.destroy(result)

        return response.json()
    }
}