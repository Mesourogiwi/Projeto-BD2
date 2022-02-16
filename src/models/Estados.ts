import { Model, DataTypes } from "sequelize";

//@ts-ignore
export class Estados extends Model {
    static init(sequelize) {
        //@ts-ignore
        super.init(
            {
                id_estado: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                estado: DataTypes.STRING,
                sigla: DataTypes.STRING,
            },
            {
                sequelize,
                tableName: 'estados'
            }
        )
    }
}