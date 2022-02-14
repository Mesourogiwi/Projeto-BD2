import { Model, DataTypes } from "sequelize";
import { TypesEndereco } from "./Enderecos";

//@ts-ignore
export class Usuarios extends Model {
    static init(sequelize) {
        //@ts-ignore
        super.init(
            {
                id_usuario: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                nome: DataTypes.STRING,
                email: DataTypes.STRING,
                senha: DataTypes.STRING,
                cpf: DataTypes.STRING,
                endereco: DataTypes.INTEGER,
                admin: DataTypes.TINYINT
            },
            {
                sequelize,
                tableName: 'usuarios'
            }
        )
    }

    static associate(models) {
        //@ts-ignore
        this.belongsTo(models.Enderecos, { foreignKey: 'endereco' })
    }
}

export type TypesUsuarios = {
    nome: string,
    email: string,
    senha: string,
    cpf: string,
    endereco: TypesEndereco,
    admin?: boolean
}