import { Estados } from "../models/Estados";
import { Request, Response } from "express";

export class EstadosController {
    async index(request: Request, response: Response) {
        try {
            //@ts-ignore
            const result = await Estados.findAll();

            return response.json(result)
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async store(request: Request, response: Response) {
        const { estado, sigla } = request.body;

        try {
            if (!estado || !sigla) {
                return response.status(400).json('Preencha os campos')
            }
            //@ts-ignore
            if (await Estados.findOne({
                where: {
                    sigla
                }
            })) {
                return response.status(400).json('Esse estado já está cadastrado!')
            }
            //@ts-ignore
            const result = await Estados.create({ estado, sigla })

            return response.json(result)
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async edit(request: Request, response: Response) {
        const { estado, sigla } = request.body;
        const { id_estado } = request.params;

        try {
            //@ts-ignore
            const result = await Estados.findByPk(id_estado)

            const afterUpdate = await result.update({ estado, sigla })

            return response.json(afterUpdate)
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async destroy(request: Request, response: Response) {
        const { id_estado } = request.params

        try {
            //@ts-ignore
            const result = await Estados.findByPk(id_estado)

            //@ts-ignore
            await result.destroy(result)

            return response.json()
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }
}