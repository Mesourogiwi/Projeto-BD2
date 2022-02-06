import { Cidades } from "../models/Cidades";
import { Estados } from "../models/Estados";
import { Request, Response } from "express";

export class CidadesController {
    async index(request: Request, response: Response) {
        try {
            //@ts-ignore
            const result = await Cidades.findAll({
                include: [
                    { model: Estados }
                ]
            });

            return response.json(result)
        } catch (err) {
            throw new Error(err)
        }
    }

    async store(request: Request, response: Response) {
        const { cidade, estado } = request.body;

        try {
            if (!cidade || !estado) {
                return response.status(400).json('Preencha os campos')
            }
            //@ts-ignore
            if (await Cidades.findOne({
                where: {
                    cidade
                }
            })) {
                return response.status(400).json('Essa cidade já existe!')
            }
            //@ts-ignore
            const result = await Cidades.create({ cidade, estado })

            return response.json(result)
        } catch (err) {
            throw new Error(err)
        }
    }

    async edit(request: Request, response: Response) {
        const { cidade, estado } = request.body;
        const { id_cidade } = request.params;

        try {
            //@ts-ignore
            const result = await Cidades.findByPk(id_cidade)

            const afterUpdate = await result.update({
                cidade,
                estado
            })

            return response.json(afterUpdate)
        } catch (err) {
            throw new Error(err)
        }
    }

    async destroy(request: Request, response: Response) {
        const { id_cidade } = request.params

        //@ts-ignore
        const result = await Cidades.findByPk(id_cidade)

        //@ts-ignore
        await result.destroy(result)

        return response.json()
    }
}