import { compare, hash } from 'bcrypt'
import { Request, Response } from 'express'
import { Clientes } from '../models/Clientes'
import { sign } from 'jsonwebtoken'

export class AuthController {
    async register(request: Request, response: Response) {
        try {
            const { nome, email, senha, cpf, endereco } = request.body
            if (!nome || !email || !senha || !cpf || !endereco) {
                return response.status(400).json('Preencha os campos')
            }
            //@ts-ignore
            if (await Clientes.findOne({
                where: {
                    email
                }
            })) {
                return response.status(400).send({ error: 'Usuário já existe!' })
            }
            const passwordHash = await hash(senha, 10)
            //@ts-ignore
            const cliente = await Clientes.create({ nome, email, senha: passwordHash, cpf, endereco })
            cliente.setDataValue('senha', undefined)

            return response.send({ cliente })
        } catch (err) {
            return response.status(400).send({ error: 'Falha no registro' })
        }
    }
    async authenticate(request: Request, response: Response) {
        const { email, senha } = request.body

        //@ts-ignore
        const cliente = await Clientes.findOne({
            where: {
                email
            }
        })

        if (!cliente) {
            return response.status(400).send({ error: 'Usuário não encontrado.' })
        }

        await compare(senha, cliente.getDataValue('senha')).then((result) => {
            if (!result) {
                return response.status(400).send({ error: 'Senha Inválida' })
            }
        })

        cliente.setDataValue('senha', undefined)

        const token = sign({ id: cliente.getDataValue('id_cliente') }, process.env.JWT_SECRET, {
            subject: String(cliente.getDataValue('id_cliente')),
            expiresIn: 86400
        })

        response.send({ cliente, token })
    }
}