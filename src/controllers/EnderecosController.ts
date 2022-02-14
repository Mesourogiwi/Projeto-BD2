// import { Enderecos, TypesEndereco } from "../models/Enderecos";
// import { Estados } from "../models/Estados";
// import { Cidades } from "../models/Cidades";
// import { Request, Response } from "express";

// export class EnderecosController {
//     async index(request: Request, response: Response) {
//         try {
//             //@ts-ignore
//             const result = await Enderecos.findAll({
//                 include: [
//                     { model: Estados },
//                     { model: Cidades }
//                 ]
//             });

//             return response.json(result)
//         } catch (err) {
//             throw new Error(err)
//         }
//     }

//     async store(request: Request, response: Response) {
//         const { rua, bairro, numero, cidade, estado, CEP }: TypesEndereco = request.body;

//         try {
//             if (!rua || !bairro || !numero || !cidade || !estado || !CEP) {
//                 return response.status(400).json('Preencha os campos')
//             }
//             //@ts-ignore
//             const result = await Enderecos.create({ rua, bairro, numero, cidade, estado, CEP })

//             return response.json(result)
//         } catch (err) {
//             throw new Error(err)
//         }
//     }

//     async edit(request: Request, response: Response) {
//         const { rua, bairro, numero, cidade, estado, CEP }: TypesEndereco = request.body;
//         const { id_endereco } = request.params;

//         try {
//             //@ts-ignore
//             const result = await Enderecos.findByPk(id_endereco)

//             const afterUpdate = await result.update({ rua, bairro, numero, cidade, estado, CEP })

//             return response.json(afterUpdate)
//         } catch (err) {
//             throw new Error(err)
//         }
//     }

//     async destroy(request: Request, response: Response) {
//         const { id_endereco } = request.params

//         //@ts-ignore
//         const result = await Enderecos.findByPk(id_endereco)

//         //@ts-ignore
//         await result.destroy(result)

//         return response.json()
//     }
// }