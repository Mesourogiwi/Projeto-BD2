import { Categorias } from "../models/Categorias";
import { Request, Response } from "express";

export class CategoriasController {
    async index(request: Request, response: Response) {
        try {
            //@ts-ignore
            const result = await Categorias.findAll();

            return response.json(result)
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async store(request: Request, response: Response) {
        const { nome } = request.body;

        try {
            if (!nome) {
                return response.status(400).json('Preencha os campos')
            }
            //@ts-ignore
            if (await Categorias.findOne({
                where: {
                    nome
                }
            })) {
                return response.status(400).json('Essa categoria já existe!')
            }
            //@ts-ignore
            const result = await Categorias.create({ nome })

            return response.json(result)
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async edit(request: Request, response: Response) {
        const { nome } = request.body;
        const { id_categoria } = request.params;

        try {
            //@ts-ignore
            const result = await Categorias.findByPk(id_categoria)

            const afterUpdate = await result.update({
                nome,
            })

            return response.json(afterUpdate)
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async destroy(request: Request, response: Response) {
        const { id_categoria } = request.params

        try {
            //@ts-ignore
            const result = await Categorias.findByPk(id_categoria)

            //@ts-ignore
            await result.destroy(result)

            return response.json()
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }
}