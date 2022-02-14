import { compare, hash } from 'bcrypt'
import { Request, Response } from 'express'
import { Usuarios, TypesUsuarios } from '../models/Usuarios'
import { Enderecos } from '../models/Enderecos'
import { sign } from 'jsonwebtoken'

export class AuthController {
    async register(request: Request, response: Response) {
        try {
            const { nome, email, senha, cpf, endereco, admin }: TypesUsuarios = request.body
            if (!nome || !email || !senha || !cpf) {
                return response.status(400).json('Preencha os campos')
            }
            //@ts-ignore
            if (await Usuarios.findOne({
                where: {
                    email
                }
            })) {
                return response.status(400).send({ error: 'Usuário já existe!' })
            }

            let resultEndereco
            if (endereco) {
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

            console.log('zzzzz', resultEndereco?.getDataValue('id_endereco'))

            const passwordHash = await hash(senha, 10)
            //@ts-ignore
            const usuario = await Usuarios.create({ nome, email, senha: passwordHash, cpf, endereco: resultEndereco?.getDataValue('id_endereco') ?? null, admin: admin ?? 0 })
            usuario.setDataValue('senha', undefined)

            const token = sign({
                usuario: {
                    id: usuario.getDataValue('id_usuario'),
                    admin: admin ?? 0
                }
            }, process.env.JWT_SECRET, {
                subject: String(usuario.getDataValue('id_usuario')),
                expiresIn: 86400
            })

            return response.send({ usuario, token })
        } catch (err) {
            console.log(err)
            return response.status(400).send({ error: 'Falha no registro' })
        }
    }
    async authenticate(request: Request, response: Response) {
        const { email, senha } = request.body

        //@ts-ignore
        const usuario = await Usuarios.findOne({
            where: {
                email
            }
        })

        if (!usuario) {
            return response.status(400).send({ error: 'Email/Senha incorretos.' })
        }

        await compare(senha, usuario.getDataValue('senha')).then((result) => {
            if (!result) {
                return response.status(400).send({ error: 'Email/Senha incorretos.' })
            }
        })

        usuario.setDataValue('senha', undefined)

        const token = sign({ id: usuario.getDataValue('id_usuario') }, process.env.JWT_SECRET, {
            subject: String(usuario.getDataValue('id_usuario')),
            expiresIn: 86400
        })

        response.send({ usuario, token })
    }
}