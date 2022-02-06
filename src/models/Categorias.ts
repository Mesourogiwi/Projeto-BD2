import { Model, DataTypes } from "sequelize";

//@ts-ignore
export class Categorias extends Model {
    static init(sequelize) {
        //@ts-ignore
        super.init(
            {
                id_categoria: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                nome: DataTypes.STRING
            },
            {
                sequelize,
                tableName: 'categorias'
            }
        )
    }
}