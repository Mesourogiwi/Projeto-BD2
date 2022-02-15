import { Usuarios, TypesUsuarios } from "../models/Usuarios";
import { Enderecos } from "../models/Enderecos";
import { Request, Response } from "express";

export class UsuariosController {
    async index(request: Request, response: Response) {
        try {
            //@ts-ignore
            const result = await Usuarios.findAll({
                include: [
                    { model: Enderecos }
                ],
                attributes: {
                    exclude: ['senha']
                }
            });

            return response.json(result)
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async edit(request: Request, response: Response) {
        const { nome, email, senha, cpf, endereco }: TypesUsuarios = request.body;
        const { id_usuario } = request.params;

        try {
            //@ts-ignore
            const result = await Usuarios.findByPk(id_usuario)

            let resultEndereco
            if (result.getDataValue('endereco')) {
                //@ts-ignore
                resultEndereco = await Enderecos.update({
                    rua: endereco.rua,
                    bairro: endereco.bairro,
                    numero: endereco?.numero ?? null,
                    cidade: endereco.cidade,
                    estado: endereco.estado,
                    CEP: endereco.CEP
                }, {
                    where: {
                        id_endereco: result.getDataValue('endereco')
                    }
                })
            }
            else if (endereco) {
                //@ts-ignore
                resultEndereco = await Enderecos.create({
                    rua: endereco.rua,
                    bairro: endereco.bairro,
                    numero: endereco?.numero ?? null,
                    cidade: endereco.cidade,
                    estado: endereco.estado,
                    CEP: endereco.CEP
                })
            }

            const afterUpdate = await result.update({
                nome,
                email,
                senha,
                cpf,
                endereco: resultEndereco?.getDataValue('id_endereco') ?? null
            })

            return response.json(afterUpdate)
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }

    async destroy(request: Request, response: Response) {
        const { id_usuario } = request.params

        try {
            //@ts-ignore
            const result = await Usuarios.findByPk(id_usuario)

            //@ts-ignore
            await result.destroy(result)

            return response.json()
        } catch (err) {
            console.log(err)
            return response.status(502).send({ error: 'Falha no servidor' })
        }
    }
}