import { Marcas } from "../models/Marcas";
import { Request, Response } from "express";

export class MarcasController {
    async index(request: Request, response: Response) {
        try {
            //@ts-ignore
            const result = await Marcas.findAll();

            return response.json(result)
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async store(request: Request, response: Response) {
        const { marca } = request.body;

        try {
            if (!marca) {
                return response.status(400).json('Preencha os campos')
            }
            //@ts-ignore
            if (await Marcas.findOne({
                where: {
                    marca
                }
            })) {
                return response.status(400).json('Essa marca já está cadastrada!')
            }
            //@ts-ignore
            const result = await Marcas.create({ marca })

            return response.json(result)
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async edit(request: Request, response: Response) {
        const { marca } = request.body;
        const { id_marca } = request.params;

        try {
            //@ts-ignore
            const result = await Marcas.findByPk(id_marca)

            const afterUpdate = await result.update({ marca })

            return response.json(afterUpdate)
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async destroy(request: Request, response: Response) {
        const { id_marca } = request.params

        try {
            //@ts-ignore
            const result = await Marcas.findByPk(id_marca)

            //@ts-ignore
            await result.destroy(result)

            return response.json()
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }
}