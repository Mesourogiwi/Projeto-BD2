import { Produtos } from "../models/Produtos";
import { Categorias } from "../models/Categorias";
import { Marcas } from "../models/Marcas";
import { Request, Response } from "express";

type IProductModel = {
    nome: String
    descricao: String
    imagem?: String
    preco: number
    estoque: number
    categoria: number
    marca: number
    imposto: number
}
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
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async store(request: Request, response: Response) {
        const data: IProductModel = request.body;

        console.log(data.nome)

        try {
            if (!data.nome || !data.descricao || !data.preco || !data.estoque || !data.categoria || !data.marca) {
                return response.status(400).json('Preencha os campos')
            }
            data.imagem = request.file ? request.file.filename : undefined
            //@ts-ignore
            const result = await Produtos.create(data)

            return response.json(result)
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async edit(request: Request, response: Response) {
        const data: IProductModel = request.body;
        const { id_produto } = request.params;

        try {
            data.imagem = request.file ? request.file.filename : undefined
            //@ts-ignore
            const result = await Produtos.findByPk(id_produto)

            const afterUpdate = await result.update(data)

            return response.json(afterUpdate)
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async destroy(request: Request, response: Response) {
        const { id_compras_produtos } = request.params

        try {
            //@ts-ignore
            const result = await ComprasProdutos.findByPk(id_compras_produtos)

            //@ts-ignore
            await result.destroy(result)

            return response.json()
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }
}