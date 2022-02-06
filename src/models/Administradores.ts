import { Model, DataTypes } from "sequelize";

//@ts-ignore
export class Administradores extends Model {
    static init(sequelize) {
        //@ts-ignore
        super.init(
            {
                id_administrador: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                nome: DataTypes.STRING,
                email: DataTypes.STRING,
                senha: DataTypes.STRING
            },
            {
                sequelize,
                tableName: 'administradores'
            }
        )
    }
}

