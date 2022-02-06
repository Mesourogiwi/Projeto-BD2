import { Model, DataTypes } from "sequelize";

//@ts-ignore
export class Marcas extends Model {
    static init(sequelize) {
        //@ts-ignore
        super.init(
            {
                id_marca: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                marca: DataTypes.STRING,
            },
            {
                sequelize,
                tableName: 'marcas'
            }
        )
    }
}

