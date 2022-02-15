import { Compras, TypesCompras } from "../models/Compras";
import { Usuarios } from "../models/Usuarios";
import { Request, Response } from "express";
import { ComprasProdutos } from "../models/ComprasProdutos";

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
        const { cliente, total, comprasProdutos }: TypesCompras = request.body;

        try {
            if (!cliente || !total) {
                return response.status(400).json('Preencha os campos')
            }
            //@ts-ignore
            const result = await Compras.create({ cliente, total })

            comprasProdutos.forEach(async item => {
                //@ts-ignore
                await ComprasProdutos.create({
                    produto: item.produto,
                    quantidade: item.quantidade,
                    compra: result.getDataValue('id_compra')
                })
            });

            return response.json(result)
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async edit(request: Request, response: Response) {
        const { cliente, total, comprasProdutos }: TypesCompras = request.body;
        const { id_compra } = request.params;

        try {
            //@ts-ignore
            const result = await Compras.findByPk(id_compra)

            comprasProdutos.forEach(async item => {
                //@ts-ignore
                await ComprasProdutos.update({
                    produto: item.produto,
                    quantidade: item.quantidade,
                    compra: result.getDataValue('id_compra')
                }, {
                    where: {
                        id_compras_produtos: item.id_compra_produto
                    }
                })
            });

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