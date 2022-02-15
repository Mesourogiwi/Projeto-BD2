import { Compras } from "../models/Compras";
import { Usuarios } from "../models/Usuarios";
import { Request, Response } from "express";

export class ComprasController {
    async index(request: Request, response: Response) {
        try {
            //@ts-ignore
            const result = await Compras.findAll({
                include: [
                    { model: Usuarios }
                ]
            });

            return response.json(result)
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
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
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
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
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async destroy(request: Request, response: Response) {
        const { id_compra } = request.params

        try {
            //@ts-ignore
            const result = await Compras.findByPk(id_compra)

            //@ts-ignore
            await result.destroy(result)

            return response.json()
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }
}