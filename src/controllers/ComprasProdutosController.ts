import { ComprasProdutos } from "../models/ComprasProdutos";
import { Produtos } from "../models/Produtos";
import { Compras } from "../models/Compras";
import { Request, Response } from "express";

export class ComprasProdutosController {
    async index(request: Request, response: Response) {
        try {
            //@ts-ignore
            const result = await ComprasProdutos.findAll({
                include: [
                    { model: Produtos },
                    { model: Compras },
                ]
            });

            return response.json(result)
        } catch (err) {
            throw new Error(err)
        }
    }

    async store(request: Request, response: Response) {
        const { produto, compra, quantidade } = request.body;

        try {
            if (!produto || !compra || !quantidade) {
                return response.status(400).json('Preencha os campos')
            }
            //@ts-ignore
            const result = await ComprasProdutos.create({ produto, compra, quantidade })

            return response.json(result)
        } catch (err) {
            throw new Error(err)
        }
    }

    async edit(request: Request, response: Response) {
        const { produto, compra, quantidade } = request.body;
        const { id_compras_produtos } = request.params;

        try {
            //@ts-ignore
            const result = await ComprasProdutos.findByPk(id_compras_produtos)

            const afterUpdate = await result.update({ produto, compra, quantidade })

            return response.json(afterUpdate)
        } catch (err) {
            throw new Error(err)
        }
    }

    async destroy(request: Request, response: Response) {
        const { id_compras_produtos } = request.params

        //@ts-ignore
        const result = await ComprasProdutos.findByPk(id_compras_produtos)

        //@ts-ignore
        await result.destroy(result)

        return response.json()
    }
}