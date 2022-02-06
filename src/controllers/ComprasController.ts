import { Compras } from "../models/Compras";
import { Clientes } from "../models/Clientes";
import { Request, Response } from "express";

export class ComprasController {
    async index(request: Request, response: Response) {
        try {
            //@ts-ignore
            const result = await Compras.findAll({
                include: [
                    { model: Clientes }
                ]
            });

            return response.json(result)
        } catch (err) {
            throw new Error(err)
        }
    }

    async store(request: Request, response: Response) {
        const { cliente, total } = request.body;

        try {
            if (!cliente || !total) {
                return response.status(400).json('Preencha os campos')
            }
            //@ts-ignore
            const result = await Compras.create({ cliente, total })

            return response.json(result)
        } catch (err) {
            throw new Error(err)
        }
    }

    async edit(request: Request, response: Response) {
        const { cliente, total } = request.body;
        const { id_compra } = request.params;

        try {
            //@ts-ignore
            const result = await Compras.findByPk(id_compra)

            const afterUpdate = await result.update({
                cliente,
                total
            })

            return response.json(afterUpdate)
        } catch (err) {
            throw new Error(err)
        }
    }

    async destroy(request: Request, response: Response) {
        const { id_compra } = request.params

        //@ts-ignore
        const result = await Compras.findByPk(id_compra)

        //@ts-ignore
        await result.destroy(result)

        return response.json()
    }
}