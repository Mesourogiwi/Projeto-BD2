import { Produtos } from "../models/Produtos";
import { Categorias } from "../models/Categorias";
import { Marcas } from "../models/Marcas";
import { Request, Response } from "express";

export class ProdutosController {
    async index(request: Request, response: Response) {
        try {
            //@ts-ignore
            const result = await Produtos.findAll({
                include: [
                    { model: Categorias },
                    { model: Marcas },
                ]
            });

            return response.json(result)
        } catch (err) {
            throw new Error(err)
        }
    }

    async store(request: Request, response: Response) {
        const { nome, descricao, imagem, preco, estoque, categoria, marca, imposto } = request.body;

        try {
            if (!nome || !descricao || !imagem || !preco || !estoque || !categoria || !marca || !imposto) {
                return response.status(400).json('Preencha os campos')
            }
            //@ts-ignore
            const result = await Produtos.create({ nome, descricao, imagem, preco, estoque, categoria, marca, imposto })

            return response.json(result)
        } catch (err) {
            throw new Error(err)
        }
    }

    async edit(request: Request, response: Response) {
        const { nome, descricao, imagem, preco, estoque, categoria, marca, imposto } = request.body;
        const { id_produto } = request.params;

        try {
            //@ts-ignore
            const result = await ComprasProdutos.findByPk(id_produto)

            const afterUpdate = await result.update({ nome, descricao, imagem, preco, estoque, categoria, marca, imposto })

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